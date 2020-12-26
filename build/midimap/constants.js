"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Buttons = exports.PadModes = exports.CHANNEL_RIGHT_PADS = exports.CHANNEL_RIGHT_MAIN = exports.CHANNEL_LEFT_PADS = exports.CHANNEL_LEFT_MAIN = void 0;
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
        note: '11',
    },
    {
        type: 'cue',
        note: '12',
    },
    {
        type: 'shift',
        note: '63',
    },
    {
        type: 'platter',
        note: '54',
    },
    {
        type: 'beatsync',
        note: '88',
    },
    {
        type: 'beatsync_long',
        note: '92',
    },
    {
        type: 'loop_in',
        note: '16',
    },
    {
        type: 'loop_in_long',
        note: '20',
    },
    {
        type: 'loop_out',
        note: '17',
    },
    {
        type: 'reloop',
        note: '77',
    },
    {
        type: 'call_back',
        note: '81',
    },
    {
        type: 'call_forward',
        note: '83',
    },
    {
        type: 'phones_cue',
        note: '84',
    },
];
