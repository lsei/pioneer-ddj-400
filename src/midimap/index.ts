import { BUTTONS_GLOBAL, KNOBS_GLOBAL } from './globals';
import { BUTTONS_LEFT, JOGDIAL_LEFT, KNOBS_LEFT } from './left';
import { BUTTONS_RIGHT, JOGDIAL_RIGHT, KNOBS_RIGHT } from './right';

export const BUTTON_MAP = {
    ...BUTTONS_LEFT,
    ...BUTTONS_RIGHT,
    ...BUTTONS_GLOBAL,
};

export const KNOB_MAP = {
    ...KNOBS_LEFT,
    ...KNOBS_RIGHT,
    ...KNOBS_GLOBAL,
};

export const JOGDIAL_MAP = {
    ...JOGDIAL_LEFT,
    ...JOGDIAL_RIGHT,
};
