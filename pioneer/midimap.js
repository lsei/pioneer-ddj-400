const channels = {
    LEFT_MAIN: 0,
    LEFT_PADS: 7,

    RIGHT_MAIN: 1,
    RIGHT_PADS: 9,
};

const left = {
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

const HI_RES_CONTROLS = {
    "6_63": {
        name: "fader",
        major: "6_31",
        minor: "6_63",
    },
    "0_51": {
        name: "leftvolume",
        major: "0_19",
        minor: "0_51",
    },
    "1_51": {
        name: "rightvolume",
        major: "1_19",
        minor: "1_51",
    },
    "6_55": {
        name: "leftfilter",
        major: "6_23",
        minor: "6_55",
    },
    "6_56": {
        name: "rightfilter",
        major: "6_24",
        minor: "6_56",
    },
};

module.exports = {
    channels,
    left,
    HI_RES_CONTROLS,
};
