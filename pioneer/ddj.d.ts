import { EventEmitter } from 'events';

export type PadMode = 'HOT_CUE' | 'BEAT_LOOP' | 'BEAT_JUMP' | 'SAMPLER';

export enum Side {
    LEFT,
    RIGHT,
}

export enum ValueSyncTime {
    POST_LISTENER_SETUP,
}

export interface DDJOptions {
    intialPadMode: PadMode;
    logOutgoingCommands: boolean;
    logIncomingCommands: boolean;
    syncValuesFromController: string;
    normaliseValues: boolean;
}

export interface PadEvent {
    row: number;
    col: number;
    mode: PadMode;
    side: Side;
    value: number;
}

export enum ButtonType {
    Play,
    Cue,
}

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

export interface JogdialEvent {
    side: Side;
    value: number;
}

export declare class DDJ extends EventEmitter {
    constructor(name: string, options: DDJOptions);
    options: DDJOptions;

    on(event: 'pad', handler: (param: PadEvent) => void): this;
    on(event: 'encoder', handler: (param: EncoderEvent) => void): this;
    on(event: 'volume', handler: (param: EncoderEvent) => void): this;
    on(event: 'temp', handler: (param: EncoderEvent) => void): this;
    on(event: 'filter', handler: (param: EncoderEvent) => void): this;
    on(event: 'jogdial', handler: (param: JogdialEvent) => void): this;

    setPlayLeft(state: boolean): void;
    setCueLeft(state: boolean): void;
    setPadLeft(row: number, col: number, state: boolean): void;
    setPadLeft(row: number, col: number, state: boolean, mode: PadMode): void;
    setPadModeLeft(mode: PadMode): void;
}
