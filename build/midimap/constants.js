"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jogdials = exports.Knobs = exports.Buttons = exports.PadModes = exports.CHANNEL_RIGHT_PADS = exports.CHANNEL_RIGHT_MAIN = exports.CHANNEL_LEFT_PADS = exports.CHANNEL_LEFT_MAIN = void 0;
exports.CHANNEL_LEFT_MAIN = 0;
exports.CHANNEL_LEFT_PADS = 7;
exports.CHANNEL_RIGHT_MAIN = 1;
exports.CHANNEL_RIGHT_PADS = 9;
exports.PadModes = [
    {
        type: 'HOT_CUE',
        startIndex: 0,
    },
    {
        type: 'BEAT_LOOP',
        startIndex: 96,
    },
    {
        type: 'BEAT_JUMP',
        startIndex: 32,
    },
    {
        type: 'SAMPLER',
        startIndex: 48,
    },
];
exports.Buttons = [
    {
        type: 'play',
        note: 11,
    },
    {
        type: 'cue',
        note: 12,
    },
    {
        type: 'shift',
        note: 63,
    },
    {
        type: 'platter',
        note: 54,
    },
    {
        type: 'beatsync',
        note: 88,
    },
    {
        type: 'beatsync_long',
        note: 92,
    },
    {
        type: 'loop_in',
        note: 16,
    },
    {
        type: 'loop_in_long',
        note: 20,
    },
    {
        type: 'loop_out',
        note: 17,
    },
    {
        type: 'reloop',
        note: 77,
    },
    {
        type: 'call_back',
        note: 81,
    },
    {
        type: 'call_forward',
        note: 83,
    },
    {
        type: 'phones_cue',
        note: 84,
    },
    {
        type: 'hot_cue',
        note: 27,
    },
    {
        type: 'beat_loop',
        note: 109,
    },
    {
        type: 'beat_jump',
        note: 32,
    },
    {
        type: 'sampler',
        note: 34,
    },
];
exports.Knobs = [
    {
        type: 'trim',
        majorNote: 4,
        minorNote: 36,
    },
    {
        type: 'eq_high',
        majorNote: 7,
        minorNote: 39,
    },
    {
        type: 'eq_mid',
        majorNote: 11,
        minorNote: 43,
    },
    {
        type: 'eq_low',
        majorNote: 15,
        minorNote: 47,
    },
    {
        type: 'level',
        majorNote: 19,
        minorNote: 51,
    },
    {
        type: 'tempo',
        majorNote: 0,
        minorNote: 32,
    },
];
exports.Jogdials = [
    {
        type: 'jogdial',
        vinyl_mode: 'on',
        position: 'platter',
        controller: 34,
    },
    {
        type: 'jogdial',
        vinyl_mode: 'off',
        position: 'platter',
        controller: 35,
    },
    {
        type: 'jogdial',
        position: 'wheel',
        controller: 33,
    },
];
