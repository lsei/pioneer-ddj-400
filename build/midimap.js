"use strict";
var channels = {
    LEFT_MAIN: 0,
    LEFT_PADS: 7,
    RIGHT_MAIN: 1,
    RIGHT_PADS: 9,
};
var left = {
    PLAY_PAUSE: [channels.LEFT_MAIN, 11],
    CUE: [channels.LEFT_MAIN, 12],
    SHIFT: [channels.LEFT_MAIN, 63],
    // PAD MENU
    HOT_CUE: [channels.LEFT_MAIN, 27],
    BEAT_LOOP: [channels.LEFT_MAIN, 109],
    BEAT_JUMP: [channels.LEFT_MAIN, 32],
    SAMPLER: [channels.LEFT_MAIN, 34],
    // PADS
    HOT_CUE_PAD_0_0: [channels.LEFT_PADS, 0],
    HOT_CUE_PAD_0_1: [channels.LEFT_PADS, 1],
    HOT_CUE_PAD_0_2: [channels.LEFT_PADS, 2],
    HOT_CUE_PAD_0_3: [channels.LEFT_PADS, 3],
    HOT_CUE_PAD_1_0: [channels.LEFT_PADS, 4],
    HOT_CUE_PAD_1_1: [channels.LEFT_PADS, 5],
    HOT_CUE_PAD_1_2: [channels.LEFT_PADS, 6],
    HOT_CUE_PAD_1_3: [channels.LEFT_PADS, 7],
    SAMPLER_PAD_0_0: [channels.LEFT_PADS, 48],
    SAMPLER_PAD_0_1: [channels.LEFT_PADS, 49],
    SAMPLER_PAD_0_2: [channels.LEFT_PADS, 50],
    SAMPLER_PAD_0_3: [channels.LEFT_PADS, 51],
    SAMPLER_PAD_1_0: [channels.LEFT_PADS, 52],
    SAMPLER_PAD_1_1: [channels.LEFT_PADS, 53],
    SAMPLER_PAD_1_2: [channels.LEFT_PADS, 54],
    SAMPLER_PAD_1_3: [channels.LEFT_PADS, 55],
};
var JOGDIALS = {
    // left side
    '0_34': {
        type: 'jogdial',
        side: 'left',
        vinyl_mode: 'on',
        position: 'platter',
    },
    '0_35': {
        type: 'jogdial',
        side: 'left',
        vinyl_mode: 'off',
        position: 'platter',
    },
    '0_41': {
        type: 'jogdial',
        side: 'left',
        position: 'platter',
        shift: true,
    },
    '0_33': {
        type: 'jogdial',
        side: 'left',
        position: 'wheel',
    },
    // Right side
    '1_34': {
        type: 'jogdial',
        side: 'right',
        vinyl_mode: 'on',
        position: 'platter',
    },
    '1_35': {
        type: 'jogdial',
        side: 'right',
        vinyl_mode: 'off',
        position: 'platter',
    },
    '1_41': {
        type: 'jogdial',
        side: 'left',
        position: 'platter',
        shift: true,
    },
    '1_33': {
        type: 'jogdial',
        side: 'right',
        position: 'wheel',
    },
};
var HI_RES_CONTROLS = {
    '6_63': {
        type: 'crossfader',
        major: '6_31',
        minor: '6_63',
    },
    '0_51': {
        type: 'volume',
        side: 'left',
        major: '0_19',
        minor: '0_51',
    },
    '1_51': {
        type: 'volume',
        side: 'right',
        major: '1_19',
        minor: '1_51',
    },
    '6_55': {
        type: 'filter',
        side: 'left',
        major: '6_23',
        minor: '6_55',
    },
    '6_56': {
        type: 'filter',
        side: 'right',
        major: '6_24',
        minor: '6_56',
    },
    '0_32': {
        type: 'tempo',
        side: 'left',
        major: '0_0',
        minor: '0_32',
    },
    '1_32': {
        type: 'tempo',
        side: 'right',
        major: '1_0',
        minor: '1_32',
    },
};
var BUTTON_MAP = {
    '0_11': {
        type: 'play',
        side: 'left',
    },
    '0_54': {
        type: 'platter',
        side: 'left',
    },
    '1_54': {
        type: 'platter',
        side: 'right',
    },
    '7_0': {
        type: 'pad',
        category: 'HOT_CUE',
        row: 0,
        col: 0,
        side: 'left',
    },
    '7_1': {
        type: 'pad',
        category: 'HOT_CUE',
        row: 0,
        col: 1,
        side: 'left',
    },
    '7_2': {
        type: 'pad',
        category: 'HOT_CUE',
        row: 0,
        col: 2,
        side: 'left',
    },
    '7_3': {
        type: 'pad',
        category: 'HOT_CUE',
        row: 0,
        col: 3,
        side: 'left',
    },
    '7_4': {
        type: 'pad',
        category: 'HOT_CUE',
        row: 1,
        col: 0,
        side: 'left',
    },
    '7_5': {
        type: 'pad',
        category: 'HOT_CUE',
        row: 1,
        col: 1,
        side: 'left',
    },
    '7_6': {
        type: 'pad',
        category: 'HOT_CUE',
        row: 1,
        col: 2,
        side: 'left',
    },
    '7_7': {
        type: 'pad',
        category: 'HOT_CUE',
        row: 1,
        col: 3,
        side: 'left',
    },
};
module.exports = {
    channels: channels,
    left: left,
    HI_RES_CONTROLS: HI_RES_CONTROLS,
    BUTTON_MAP: BUTTON_MAP,
    JOGDIALS: JOGDIALS,
};
