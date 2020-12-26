import easymidi from 'easymidi';
import { EventEmitter } from 'events';

export type PadMode = 'HOT_CUE' | 'BEAT_LOOP' | 'BEAT_JUMP' | 'SAMPLER';

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

export interface PadEvent {
    row: number;
    col: number;
    mode: PadMode;
    side: Side;
    value: boolean;
}

export type ButtonType = 'PLAY' | 'CUE';

export interface ButtonEvent {
    type: ButtonType;
    side: Side;
    state: boolean;
}

export enum EncoderType {
    Crossfader,
    ChannelFader,
    Volume,
    Tempo,
    Filter,
    Trim,
    EqHigh,
    EqMid,
    EqLow,
    MasterLevel,
    HeadphonesMixing,
    HeadphonesLevel,
}

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

export type EncoderEventTypeName = 'encoder' | 'volume' | 'tempo' | 'filter' | 'crossfader' | 'channel';
export type ButtonEventTypeName =
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
    | 'select'
    | 'master_value'
    | 'master_cue'
    | 'beatfx_back'
    | 'beatfx_foward'
    | 'beatfx_select'
    | 'beatfx_channel'
    | 'beatfx_level'
    | 'beatfx_toggle'
    | 'beatsync'
    | 'beatsync_long';

export declare class DDJ extends EventEmitter {
    constructor(name: string, options: DDJOptions);
    options: DDJOptions;

    on(event: 'pad', handler: (param: PadEvent) => void): this;
    on(event: EncoderEventTypeName, handler: (param: EncoderEvent) => void): this;
    on(event: 'jogdial', handler: (param: JogdialEvent) => void): this;
    on(event: ButtonEventTypeName, handler: (param: ButtonEvent) => void): this;

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
