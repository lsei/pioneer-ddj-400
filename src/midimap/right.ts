import { CHANNEL_RIGHT_PADS, PadModes, Buttons, CHANNEL_RIGHT_MAIN } from './constants';

const SIDE = 'right';

export const BUTTON_MAP_RIGHT: { [key: string]: any } = {};

Buttons.forEach((b) => {
    const key = `${CHANNEL_RIGHT_MAIN}_${b.note}`;
    BUTTON_MAP_RIGHT[key] = {
        type: b.type,
        side: SIDE,
    };
});

PadModes.forEach((m) => {
    for (let i = 0; i < 8; i++) {
        const key = `${CHANNEL_RIGHT_PADS}_${m.startIndex + i}`;
        BUTTON_MAP_RIGHT[key] = {
            type: 'pad',
            category: m.type,
            row: Math.floor(i / 4),
            col: i - Math.floor(i / 4) * 4,
            side: SIDE,
        };
    }
});
