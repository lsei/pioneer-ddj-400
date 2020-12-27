const GLOBAL_CHANNEL = 6;
const BEATFX_CHANNEL = 4;

export const KNOBS_GLOBAL = [
    {
        type: 'phones_mixing',
        majorNote: 12,
        minorNote: 44,
        channel: GLOBAL_CHANNEL,
    },
    {
        type: 'phones_level',
        majorNote: 13,
        minorNote: 45,
        channel: GLOBAL_CHANNEL,
    },
    {
        type: 'master_level',
        majorNote: 8,
        minorNote: 40,
        channel: GLOBAL_CHANNEL,
    },
    {
        type: 'filter',
        majorNote: 23,
        minorNote: 55,
        side: 'left',
        channel: GLOBAL_CHANNEL,
    },
    {
        type: 'filter',
        majorNote: 24,
        minorNote: 56,
        side: 'right',
        channel: GLOBAL_CHANNEL,
    },
    {
        type: 'beatfx_level',
        majorNote: 2,
        minorNote: 34,
        channel: BEATFX_CHANNEL,
    },
    {
        type: 'crossfader',
        majorNote: 31,
        minorNote: 63,
        channel: GLOBAL_CHANNEL,
    },
].reduce((acc: any, curr: any, i) => {
    let key = `${curr.channel}_${curr.minorNote}`;
    acc[key] = {
        type: curr.type,
        side: curr.side,
        major: `${curr.channel}_${curr.majorNote}`,
        minor: `${curr.channel}_${curr.minorNote}`,
    };
    return acc;
}, {});

export const BUTTONS_GLOBAL = [
    {
        type: 'load_select',
        note: 65,
        channel: GLOBAL_CHANNEL,
    },
    {
        type: 'load',
        note: 70,
        channel: GLOBAL_CHANNEL,
        side: 'left',
    },
    {
        type: 'load',
        note: 71,
        channel: GLOBAL_CHANNEL,
        side: 'right',
    },
    {
        type: 'master_cue',
        note: 99,
        channel: GLOBAL_CHANNEL,
    },
    {
        type: 'beatfx_back',
        note: 74,
        channel: BEATFX_CHANNEL,
    },
    {
        type: 'beatfx_forward',
        note: 75,
        channel: BEATFX_CHANNEL,
    },
    {
        type: 'beatfx_select',
        note: 99,
        channel: BEATFX_CHANNEL,
    },
    {
        type: 'beatfx_channel_1',
        note: 16,
        channel: BEATFX_CHANNEL,
    },
    {
        type: 'beatfx_channel_2',
        note: 17,
        channel: BEATFX_CHANNEL,
    },
    {
        type: 'beatfx_channel_master',
        note: 20,
        channel: BEATFX_CHANNEL,
    },
    {
        type: 'beatfx_toggle',
        note: 71,
        channel: BEATFX_CHANNEL,
    },
].reduce((acc: any, curr: any, i) => {
    let key = `${curr.channel}_${curr.note}`;
    acc[key] = curr;
    return acc;
}, {});
