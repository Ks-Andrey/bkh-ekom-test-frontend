import { ColorData, ToneCallback, Tone, ColorResultData } from "../model/types";

export type ToneConfig<S extends Record<string, (data: ColorData) => ColorResultData> = {}> = {
    name: string;
    subtone?: S;
};

export function createTone<R extends ColorResultData>(
    callback: (data: ColorData) => R
): Tone<R>;
export function createTone<
    R extends ColorResultData,
    S extends Record<string, (data: ColorData) => ColorResultData>
>(
    callback: (data: ColorData) => R,
    config: { name: string; subtone: S }
): Tone<R, S>;
export function createTone<R extends ColorResultData>(
    callback: (data: ColorData) => R,
    config: { name: string }
): Tone<R>;
export function createTone<
    R extends ColorResultData = ColorResultData,
    S extends Record<string, (data: ColorData) => ColorResultData> = {}
>(
    callback: (data: ColorData) => R,
    config?: ToneConfig<S>
): Tone<R, S> {
    const tone = ((data: ColorData) => callback(data)) as Tone<R, S>;

    if (config?.name) tone.toneName = config.name;
    if (config?.subtone) tone.subtone = config.subtone;

    return tone;
}

