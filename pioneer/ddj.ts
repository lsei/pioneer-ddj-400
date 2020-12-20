const easymidi = require('easymidi');
const { left, HI_RES_CONTROLS, BUTTON_MAP } = require('./midimap.js');

import * as em from 'easymidi';
import { EventEmitter } from 'events';

import { ButtonEvent, ButtonType, DDJOptions, EncoderEvent, PadEvent, Side } from './ddj.d';

class DDJ extends EventEmitter {
    input: em.Input;
    output: em.Output;
    options: DDJOptions;
    state: any;

    defaultOptions = {
        intialPadMode: 'HOT_CUE' as const,
        logOutgoingCommands: false,
        logIncomingCommands: false, // TODO: implement
        syncValuesFromController: 'post-listener-setup', // TODO: enum (pre, none)
        normaliseValues: true,
    };

    constructor(name = 'DDJ-400', options = {}) {
        super();
        this.options = {
            ...this.defaultOptions,
            ...options,
        };

        this.input = new easymidi.Input(name);
        this.output = new easymidi.Output(name);

        this.startListening();
        if (this.options.syncValuesFromController == 'post-listener-setup') {
            setTimeout(() => this._triggerSyncValues(), 100);
        }

        this.state = {
            padMode: this.options.intialPadMode,
            leftPlaying: false,
            controls: {
                crossfader: new HighResValue(63, 0),
                leftvolume: new HighResValue(63, 0),
                rightvolume: new HighResValue(63, 0),
                leftfilter: new HighResValue(63, 0),
                rightfilter: new HighResValue(63, 0),
                lefttempo: new HighResValue(63, 0),
                righttempo: new HighResValue(63, 0),
            },
        };
    }

    startListening() {
        this.input.on('noteon', (msg) => {
            console.log(msg);
            const key = `${msg.channel}_${msg.note}`;

            const button = BUTTON_MAP[key];
            if (!button) return;

            if (button.type == 'pad') {
                button.value = msg.velocity == 127;
                let data: PadEvent = {
                    row: button.row,
                    col: button.col,
                    mode: button.category,
                    side: button.side,
                    value: button.value,
                };
                this.emit('pad', data);
            }

            if (button.type == 'play') {
                button.value = msg.velocity == 127;
                let data: ButtonEvent = {
                    type: 'PLAY',
                    side: button.side,
                    state: button.value,
                };
                this.emit('play', data);
            }
        });

        let lastCC: any = {};

        this.input.on('cc', (msg) => {
            const key = `${msg.channel}_${msg.controller}`;
            lastCC[key] = msg.value;
            console.log(key);
            const control = HI_RES_CONTROLS[key];
            if (!control) return;

            const majorValue = lastCC[control.major];
            const controlKey = `${control.side || ''}${control.type}`;
            if (!this.state.controls[controlKey]) {
                console.log(controlKey);
            }
            this.state.controls[controlKey].set(majorValue, msg.value);

            // TODO: if this.options.normaliseValues == false
            let normalisedValue = Math.min(Math.max((majorValue + msg.value / 127) / 127, 0), 1);
            console.log(majorValue, msg.value, normalisedValue, lastCC);

            let data: EncoderEvent = {
                type: control.type,
                side: control.side,
                value: normalisedValue,
            };

            this.emit(control.type, data);
        });
    }

    playLeft(on = true) {
        this._triggerButton(left.PLAY_PAUSE, on);
    }

    padModeHotCue() {
        this._setPadMode('HOT_CUE');
    }

    setPadLeft(row: number, col: number, on = true) {
        const key = `${this.state.padMode}_PAD_${row}_${col}`;
        this._triggerButton(left[key], on);
    }

    // HOT_CUE, BEAT_LOOP, BEAT_JUMP, SAMPLER
    _setPadMode(mode: any) {
        this.state.padMode = mode;
        this._triggerButton(left[mode], true);
    }

    _triggerButton([channel, note]: [number, number], on: boolean) {
        this._send('noteon', {
            channel: channel as em.Channel,
            note,
            velocity: on ? 127 : 0,
        });
    }

    _send(event: 'noteon', params: { channel: em.Channel; note: number; velocity: number }) {
        this.output.send(event, params);
    }

    // Tells the controller to publish all current values via midi
    _triggerSyncValues() {
        this.output.send('sysex', [0xf0, 0x00, 0x40, 0x05, 0x00, 0x00, 0x02, 0x06, 0x00, 0x03, 0x01, 0xf7]);
    }
}

module.exports = DDJ;

class HighResValue {
    major: number;
    minor: number;

    constructor(major: number, minor: number) {
        this.major = major;
        this.minor = minor;
    }

    toFloat() {
        return this.major + this.minor / 127;
    }

    toString() {
        return (this.major + this.minor / 127).toString();
    }

    set(major: number, minor: number) {
        this.major = major;
        this.minor = minor;
    }
}
