const easymidi = require('easymidi');
const { left, HI_RES_CONTROLS, BUTTON_MAP } = require('./midimap.js');

class DDJ {
    defaultOptions = {
        padRows: 2,
        padCols: 4,
        intialPadMode: 'HOT_CUE',
        logOutgoingCommands: false,
        logIncomingCommands: false, // TODO: implement

        syncValuesFromController: 'post-listener-setup', // TODO: enum (pre, none)

        onFaderChange: (level) => {},
        onLeftvolumeChange: (level) => {},
        onRightvolumeChange: (level) => {},
        onLeftfilterChange: (level) => {},
        onRightfilterChange: (level) => {},
        onPlayLeft: (isPlaying) => {},

        onPad: ({ row, col, type, side, value }) => {},

        onLefttempo: (tempo) => {},
        onRighttempo: (tempo) => {},
    };

    constructor(name = 'DDJ-400', options = {}) {
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
                fader: new HighResValue(63, 0),
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
            if (button && button.type == 'pad') {
                button.value = msg.velocity == 127;
                this.options.onPad(button);
            }
            if (msg.channel == 0 && msg.note == 11 && msg.velocity == 127) {
                this.state.leftPlaying = !this.state.leftPlaying;
                this.options.onPlayLeft(this.state.leftPlaying);
                this.playLeft(this.state.leftPlaying);
            }
        });

        let lastCC = {};

        this.input.on('cc', (msg) => {
            const key = `${msg.channel}_${msg.controller}`;
            console.log(key);
            const control = HI_RES_CONTROLS[key];
            if (control) {
                const majorValue = lastCC[control.major];
                this.state.controls[control.name].set(majorValue, msg.value);
                this.options[`on${capitalizeFirstLetter(control.name)}Change`](this.state.controls[control.name]);
            }
            lastCC[key] = msg.value;
        });
    }

    playLeft(on = true) {
        this._triggerButton(left.PLAY_PAUSE, on);
    }

    padModeHotCue() {
        this._setPadMode('HOT_CUE');
    }

    pad(row, col, on = true) {
        const key = `${this.state.padMode}_PAD_${row}_${col}`;
        this._triggerButton(left[key], on);
    }

    // HOT_CUE, BEAT_LOOP, BEAT_JUMP, SAMPLER
    _setPadMode(mode) {
        this.state.padMode = mode;
        this._triggerButton(left[mode], true);
    }

    _triggerButton([channel, note], on) {
        this._send('noteon', {
            channel,
            note,
            velocity: on ? 127 : 0,
        });
    }

    _send(event, params) {
        this.output.send(event, params);
    }

    // Tells the controller to publish all current values via midi
    _triggerSyncValues() {
        this.output.send('sysex', [0xf0, 0x00, 0x40, 0x05, 0x00, 0x00, 0x02, 0x06, 0x00, 0x03, 0x01, 0xf7]);
    }
}

module.exports = DDJ;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class HighResValue {
    constructor(major, minor) {
        this.set(major, minor);
    }

    toFloat() {
        return this.major + this.minor / 127;
    }

    toString() {
        return (this.major + this.minor / 127).toString();
    }

    set(major, minor) {
        this.major = major;
        this.minor = minor;
    }
}
