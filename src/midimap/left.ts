import { CHANNEL_LEFT_PADS, PadModes, Buttons, CHANNEL_LEFT_MAIN, Knobs, Jogdials } from './constants';

const SIDE = 'left';

export const BUTTONS_LEFT: { [key: string]: any } = {};
export const KNOBS_LEFT: { [key: string]: any } = {};
export const JOGDIAL_LEFT: { [key: string]: any } = {};

Buttons.forEach((b) => {
    const key = `${CHANNEL_LEFT_MAIN}_${b.note}`;
    BUTTONS_LEFT[key] = {
        type: b.type,
        side: SIDE,
    };
});

PadModes.forEach((m) => {
    for (let i = 0; i < 8; i++) {
        const key = `${CHANNEL_LEFT_PADS}_${m.startIndex + i}`;
        BUTTONS_LEFT[key] = {
            type: 'pad',
            category: m.type,
            row: Math.floor(i / 4),
            col: i - Math.floor(i / 4) * 4,
            side: SIDE,
        };
    }
});

Knobs.forEach((k) => {
    const key = `${CHANNEL_LEFT_MAIN}_${k.minorNote}`;
    KNOBS_LEFT[key] = {
        type: k.type,
        major: `${CHANNEL_LEFT_MAIN}_${k.majorNote}`,
        minor: `${CHANNEL_LEFT_MAIN}_${k.minorNote}`,
        side: SIDE,
    };
});

Jogdials.forEach(({ controller, ...j }) => {
    const key = `${CHANNEL_LEFT_MAIN}_${controller}`;
    JOGDIAL_LEFT[key] = {
        ...j,
        side: SIDE,
    };
});
