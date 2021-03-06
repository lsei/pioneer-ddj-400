import easymidi from 'easymidi';
import { EventEmitter } from 'events';

const { left } = require('./midimap.js');
import { BUTTON_MAP, JOGDIAL_MAP, KNOB_MAP } from './midimap/index';

import { ButtonEvent, DDJOptions, EncoderEvent, JogdialEvent, PadEvent } from '..';
import { HighResValue } from './highresvalue';

class DDJ extends EventEmitter {
    input: easymidi.Input;
    output: easymidi.Output;
    options: DDJOptions;
    state: any;

    defaultOptions = {
        intialPadMode: 'HOT_CUE' as const,
        logOutgoingCommands: false,
        logIncomingCommands: false, // TODO: implement
        syncValuesFromController: 'post-listener-setup', // TODO: enum (pre, none)
        normaliseValues: true,
    };

    constructor(name = 'DDJ-400', options: DDJOptions = {}) {
        super();
        this.options = {
            ...this.defaultOptions,
            ...options,
        };

        this.input = options.midiInput || new easymidi.Input(name);
        this.output = options.midiOutput || new easymidi.Output(name);

        this.startListening();
        if (this.options.syncValuesFromController == 'post-listener-setup') {
            setTimeout(() => this._triggerSyncValues(), 100);
        }

        this.state = {
            padMode: this.options.intialPadMode,
            leftPlaying: false,
            controls: {},
        };
    }

    startListening() {
        this.input.on('noteon', (msg) => {
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
                return;
            }

            button.value = msg.velocity == 127;
            let data: ButtonEvent = {
                type: button.type,
                side: button.side,
                state: button.value,
            };
            this.emit(button.type, data);
        });

        let lastCC: any = {};

        this.input.on('cc', (msg) => {
            const key = `${msg.channel}_${msg.controller}`;
            lastCC[key] = msg.value;

            const control = KNOB_MAP[key];

            if (control) {
                const majorValue = lastCC[control.major];
                const controlKey = `${control.side || ''}${control.type}`;
                if (this.state.controls[controlKey]) {
                    this.state.controls[controlKey].set(majorValue, msg.value);
                } else {
                    this.state.controls[controlKey] = new HighResValue(majorValue, msg.value);
                }

                // TODO: if this.options.normaliseValues == false
                let normalisedValue = (majorValue + msg.value / 127) / 128;

                let data: EncoderEvent = {
                    type: control.type,
                    side: control.side,
                    value: normalisedValue,
                };

                this.emit(control.type, data);
            }

            const wheel = JOGDIAL_MAP[key];
            if (wheel) {
                let data: JogdialEvent = {
                    ...wheel,

                    // TODO: if this.options.normaliseValues == false
                    value: msg.value - 64, // "normalised to +/-3 from 0"
                };
                this.emit(wheel.type, data);
            }

            // Load Selector
            if (key === '6_64') {
                this.emit('load_selector', {
                    type: 'load_selector',
                    value: msg.value === 1 ? 1 : -1,
                });
            }
        });
    }

    setPlayLeft(on = true) {
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
            channel: channel as easymidi.Channel,
            note,
            velocity: on ? 127 : 0,
        });
    }

    _send(event: 'noteon', params: { channel: easymidi.Channel; note: number; velocity: number }) {
        this.output.send(event, params);
    }

    // Tells the controller to publish all current values via midi
    _triggerSyncValues() {
        this.output.send('sysex', [0xf0, 0x00, 0x40, 0x05, 0x00, 0x00, 0x02, 0x06, 0x00, 0x03, 0x01, 0xf7]);
    }

    close() {
        this.input.close();
        this.output.close();
    }
}

module.exports = { DDJ };
