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
}

export interface PadEvent {
    row: number;
    col: number;
    mode: PadMode;
    side: Side;
    value: number;
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

export declare class DDJ extends EventEmitter {
    constructor(name: string, options: DDJOptions);
    options: DDJOptions;

    on(event: 'pad', handler: (param: PadEvent) => void): this;

    on(event: 'encoder', handler: (param: EncoderEvent) => void): this;
    on(event: 'volume', handler: (param: EncoderEvent) => void): this;
    on(event: 'tempo', handler: (param: EncoderEvent) => void): this;
    on(event: 'filter', handler: (param: EncoderEvent) => void): this;
    on(event: 'crossfader', handler: (param: EncoderEvent) => void): this;

    on(event: 'jogdial', handler: (param: JogdialEvent) => void): this;

    on(event: 'play', handler: (param: ButtonEvent) => void): this;

    setPlayLeft(state: boolean): void;
    setCueLeft(state: boolean): void;
    setPadLeft(row: number, col: number, state: boolean): void;
    setPadLeft(row: number, col: number, state: boolean, mode: PadMode): void;
    setPadModeLeft(mode: PadMode): void;
}

export declare var DDJ: {
    constructor(name: string, options: DDJOptions): DDJ;
};

export default DDJ;
