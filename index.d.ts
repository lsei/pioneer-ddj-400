import easymidi from 'easymidi';
import { EventEmitter } from 'events';

export type Side = 'left' | 'right';
export type ValueSyncTime = 'post_listener_setup';

export interface DDJOptions {
    intialPadMode?: PadMode;
    logOutgoingCommands?: boolean;
    logIncomingCommands?: boolean;
    syncValuesFromController?: string;
    normaliseValues?: boolean;
    midiInput?: easymidi.Input;
    midiOutput?: easymidi.Output;
}

export type PadMode = 'HOT_CUE' | 'BEAT_LOOP' | 'BEAT_JUMP' | 'SAMPLER';
export interface PadEvent {
    row: number;
    col: number;
    mode: PadMode;
    side: Side;
    value: boolean;
}

export type ButtonType =
    | 'play'
    | 'cue'
    | 'phones_cue'
    | 'shift'
    | 'loop_in'
    | 'loop_out'
    | 'reloop'
    | 'call_back'
    | 'call_forward'
    | 'load'
    | 'load_select'
    | 'master_cue'
    | 'beatfx_back'
    | 'beatfx_forward'
    | 'beatfx_select'
    | 'beatfx_channel_1'
    | 'beatfx_channel_2'
    | 'beatfx_channel_master'
    | 'beatfx_toggle'
    | 'beatsync'
    | 'beatsync_long'
    | 'hot_cue'
    | 'beat_loop'
    | 'beat_jump'
    | 'sampler';

export interface ButtonEvent {
    type: ButtonType;
    side: Side;
    state: boolean;
}

export type EncoderType =
    | 'level'
    | 'master_level'
    | 'phones_mixing'
    | 'phones_level'
    | 'tempo'
    | 'filter'
    | 'crossfader'
    | 'trim'
    | 'eq_high'
    | 'eq_mid'
    | 'eq_low'
    | 'beatfx_level';
export interface EncoderEvent {
    type: EncoderType;
    side: Side;
    value: number;
}

export type JogdialPosition = 'platter' | 'side';

export interface JogdialEvent {
    position: JogdialPosition;
    shift: boolean;
    side: Side;
    value: number;
    vinyl_mode: boolean;
}

export declare class DDJ extends EventEmitter {
    constructor(name: string, options: DDJOptions);
    options: DDJOptions;

    on(event: 'pad', handler: (param: PadEvent) => void): this;
    on(event: EncoderType, handler: (param: EncoderEvent) => void): this;
    on(event: 'jogdial', handler: (param: JogdialEvent) => void): this;
    on(event: ButtonType, handler: (param: ButtonEvent) => void): this;

    setPlayLeft(state: boolean): void;
    setCueLeft(state: boolean): void;
    setPadModeLeft(mode: PadMode): void;
    setPadLeft(row: number, col: number, state: boolean): void;
    setPadLeft(row: number, col: number, state: boolean, mode: PadMode): void;

    close(): void;
}

export declare var DDJ: {
    constructor(name: string, options: DDJOptions): DDJ;
};

export default DDJ;
