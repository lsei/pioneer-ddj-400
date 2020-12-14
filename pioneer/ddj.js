const easymidi = require("easymidi");
const { left, HI_RES_CONTROLS } = require("./midimap.js");

class DDJ {
    defaultOptions = {
        padRows: 2,
        padCols: 4,
        intialPadMode: "HOT_CUE",
        logOutgoingCommands: false,
        logIncomingCommands: false, // TODO: implement

        onFaderChange: (level) => {},
        onLeftvolumeChange: (level) => {},
        onRightvolumeChange: (level) => {},
        onLeftfilterChange: (level) => {},
        onRightfilterChange: (level) => {},
    };

    constructor(name = "DDJ-400", options = {}) {
        this.options = {
            ...this.defaultOptions,
            ...options,
        };

        this.input = new easymidi.Input(name);
        this.output = new easymidi.Output(name);
        this.startListening();

        this.state = {
            padMode: this.options.intialPadMode,
            controls: {
                fader: new HighResValue(63, 0),
                leftvolume: new HighResValue(63, 0),
                rightvolume: new HighResValue(63, 0),
                leftfilter: new HighResValue(63, 0),
                rightfilter: new HighResValue(63, 0),
            },
        };
    }

    startListening() {
        // this.input.on("noteon", function (msg) {
        //     console.log(msg);
        // });

        let lastCC = {};

        this.input.on("cc", (msg) => {
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
        this._setPadMode("HOT_CUE");
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
        this._send("noteon", {
            channel,
            note,
            velocity: on ? 127 : 0,
        });
    }

    _send(event, params) {
        this.output.send(event, params);
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
