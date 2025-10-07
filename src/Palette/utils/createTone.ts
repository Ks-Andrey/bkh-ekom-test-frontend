import { ColorData, ToneCallback, SubtoneMap, Tone } from "../model/types";

export type ToneConfig<T extends ColorData> = {
    name: string;
    subtone?: SubtoneMap<T>;
};

export function createTone<T extends ColorData, R>(
    callback: ToneCallback<T, R>,
    config?: ToneConfig<T>
): Tone<T, R> {
    const tone = ((data: T) => callback(data)) as Tone<T, R>;

    if (config?.name) tone.toneName = config.name;
    if (config?.subtone) tone.subtone = config.subtone;

    return tone;
}

