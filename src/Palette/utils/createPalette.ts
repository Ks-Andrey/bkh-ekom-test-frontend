import { ColorData, InputModel, PaletteConfig, ToneMap } from "../model/types";

type PaletteResult<
    T extends ColorData,
    I extends InputModel,
    TM extends ToneMap<T>
> = {
    [K in keyof I]: T & ReturnType<TM[keyof TM]>;
} & {
    [K in keyof I as `${string & K}_${string & keyof TM}`]: ReturnType<TM[keyof TM]>;
} & {
    [K in keyof I as `${string & K}_${string & keyof TM}_${string & keyof TM[K extends keyof I ? keyof TM : never]}`]: Record<string, string>;
};

export const createPalette = <
    T extends ColorData,
    I extends InputModel,
    TM extends ToneMap<T>
>(
    input: I,
    config: PaletteConfig<T, TM>
): PaletteResult<T, I, TM> => {
    const getBaseTone = config.base;
    const tones = config.tones;

    const result: Record<string, Record<string, string>> = {};

    (Object.keys(input) as (keyof I)[]).forEach((key) => {
        const colorData = input[key];

        result[String(key)] = {
            ...colorData,
            ...getBaseTone(colorData as T),
        };

        for (const toneKey in tones) {
            const toneFn = tones[toneKey];
            result[`${String(key)}_${toneKey}`] = toneFn(colorData as T);

            if (toneFn.subtone) {
                for (const subtoneKey in toneFn.subtone) {
                    const subtoneFn = toneFn.subtone[subtoneKey];
                    result[`${String(key)}_${subtoneKey}_${toneKey}`] = subtoneFn(colorData as T);
                }
            }
        }
    });

    return result as PaletteResult<T, I, TM>;
};
