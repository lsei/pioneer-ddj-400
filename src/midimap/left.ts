import { CHANNEL_LEFT_PADS, PadModes, Buttons, CHANNEL_LEFT_MAIN } from './constants';

const SIDE = 'left';

export const BUTTON_MAP_LEFT: { [key: string]: any } = {};

Buttons.forEach((b) => {
    const key = `${CHANNEL_LEFT_MAIN}_${b.note}`;
    BUTTON_MAP_LEFT[key] = {
        type: b.type,
        side: SIDE,
    };
});

PadModes.forEach((m) => {
    for (let i = 0; i < 8; i++) {
        const key = `${CHANNEL_LEFT_PADS}_${m.startIndex + i}`;
        BUTTON_MAP_LEFT[key] = {
            type: 'pad',
            category: m.type,
            row: Math.floor(i / 4),
            col: i - Math.floor(i / 4) * 4,
            side: SIDE,
        };
    }
});
