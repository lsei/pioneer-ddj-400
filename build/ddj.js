"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var easymidi_1 = __importDefault(require("easymidi"));
var events_1 = require("events");
var left = require('./midimap.js').left;
var index_1 = require("./midimap/index");
var highresvalue_1 = require("./highresvalue");
var DDJ = /** @class */ (function (_super) {
    __extends(DDJ, _super);
    function DDJ(name, options) {
        if (name === void 0) { name = 'DDJ-400'; }
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.defaultOptions = {
            intialPadMode: 'HOT_CUE',
            logOutgoingCommands: false,
            logIncomingCommands: false,
            syncValuesFromController: 'post-listener-setup',
            normaliseValues: true,
        };
        _this.options = __assign(__assign({}, _this.defaultOptions), options);
        _this.input = options.midiInput || new easymidi_1.default.Input(name);
        _this.output = options.midiOutput || new easymidi_1.default.Output(name);
        _this.startListening();
        if (_this.options.syncValuesFromController == 'post-listener-setup') {
            setTimeout(function () { return _this._triggerSyncValues(); }, 100);
        }
        _this.state = {
            padMode: _this.options.intialPadMode,
            leftPlaying: false,
            controls: {},
        };
        return _this;
    }
    DDJ.prototype.startListening = function () {
        var _this = this;
        this.input.on('noteon', function (msg) {
            var key = msg.channel + "_" + msg.note;
            var button = index_1.BUTTON_MAP[key];
            if (!button)
                return;
            if (button.type == 'pad') {
                button.value = msg.velocity == 127;
                var data_1 = {
                    row: button.row,
                    col: button.col,
                    mode: button.category,
                    side: button.side,
                    value: button.value,
                };
                _this.emit('pad', data_1);
                return;
            }
            button.value = msg.velocity == 127;
            var data = {
                type: button.type,
                side: button.side,
                state: button.value,
            };
            _this.emit(button.type, data);
        });
        var lastCC = {};
        this.input.on('cc', function (msg) {
            var key = msg.channel + "_" + msg.controller;
            lastCC[key] = msg.value;
            var control = index_1.KNOB_MAP[key];
            if (control) {
                var majorValue = lastCC[control.major];
                var controlKey = "" + (control.side || '') + control.type;
                if (_this.state.controls[controlKey]) {
                    _this.state.controls[controlKey].set(majorValue, msg.value);
                }
                else {
                    _this.state.controls[controlKey] = new highresvalue_1.HighResValue(majorValue, msg.value);
                }
                // TODO: if this.options.normaliseValues == false
                var normalisedValue = (majorValue + msg.value / 127) / 128;
                var data = {
                    type: control.type,
                    side: control.side,
                    value: normalisedValue,
                };
                _this.emit(control.type, data);
            }
            var wheel = index_1.JOGDIAL_MAP[key];
            if (wheel) {
                var data = __assign(__assign({}, wheel), { 
                    // TODO: if this.options.normaliseValues == false
                    value: msg.value - 64 });
                _this.emit(wheel.type, data);
            }
            // Load Selector
            if (key === '6_64') {
                _this.emit('load_selector', {
                    type: 'load_selector',
                    value: msg.value === 1 ? 1 : -1,
                });
            }
        });
    };
    DDJ.prototype.setPlayLeft = function (on) {
        if (on === void 0) { on = true; }
        this._triggerButton(left.PLAY_PAUSE, on);
    };
    DDJ.prototype.padModeHotCue = function () {
        this._setPadMode('HOT_CUE');
    };
    DDJ.prototype.setPadLeft = function (row, col, on) {
        if (on === void 0) { on = true; }
        var key = this.state.padMode + "_PAD_" + row + "_" + col;
        this._triggerButton(left[key], on);
    };
    // HOT_CUE, BEAT_LOOP, BEAT_JUMP, SAMPLER
    DDJ.prototype._setPadMode = function (mode) {
        this.state.padMode = mode;
        this._triggerButton(left[mode], true);
    };
    DDJ.prototype._triggerButton = function (_a, on) {
        var channel = _a[0], note = _a[1];
        this._send('noteon', {
            channel: channel,
            note: note,
            velocity: on ? 127 : 0,
        });
    };
    DDJ.prototype._send = function (event, params) {
        this.output.send(event, params);
    };
    // Tells the controller to publish all current values via midi
    DDJ.prototype._triggerSyncValues = function () {
        this.output.send('sysex', [0xf0, 0x00, 0x40, 0x05, 0x00, 0x00, 0x02, 0x06, 0x00, 0x03, 0x01, 0xf7]);
    };
    DDJ.prototype.close = function () {
        this.input.close();
        this.output.close();
    };
    return DDJ;
}(events_1.EventEmitter));
module.exports = { DDJ: DDJ };
