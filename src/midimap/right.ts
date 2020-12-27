import { CHANNEL_RIGHT_PADS, PadModes, Buttons, CHANNEL_RIGHT_MAIN, Knobs } from './constants';

const SIDE = 'right';

export const BUTTONS_RIGHT: { [key: string]: any } = {};
export const KNOBS_RIGHT: { [key: string]: any } = {};

Buttons.forEach((b) => {
    const key = `${CHANNEL_RIGHT_MAIN}_${b.note}`;
    BUTTONS_RIGHT[key] = {
        type: b.type,
        side: SIDE,
    };
});

PadModes.forEach((m) => {
    for (let i = 0; i < 8; i++) {
        const key = `${CHANNEL_RIGHT_PADS}_${m.startIndex + i}`;
        BUTTONS_RIGHT[key] = {
            type: 'pad',
            category: m.type,
            row: Math.floor(i / 4),
            col: i - Math.floor(i / 4) * 4,
            side: SIDE,
        };
    }
});

Knobs.forEach((k) => {
    const key = `${CHANNEL_RIGHT_MAIN}_${k.minorNote}`;
    KNOBS_RIGHT[key] = {
        type: k.type,
        major: `${CHANNEL_RIGHT_MAIN}_${k.majorNote}`,
        minor: `${CHANNEL_RIGHT_MAIN}_${k.minorNote}`,
        side: SIDE,
    };
});
