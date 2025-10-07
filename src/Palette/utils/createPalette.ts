import { ColorData, InputModel, ToneMap, ColorResultData, Tone } from "../model/types";

type PaletteConfig<TM extends ToneMap> = {
    base: Tone<ColorResultData, any>;
    tones: TM;
};

type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

type SubtoneEntriesForTone<I extends InputModel, TN extends PropertyKey, S extends Record<string, unknown>> = {
  [K in keyof I as `${string & K}_${string & keyof S}_${string & TN}`]: ColorResultData
};

type AllSubtoneEntries<I extends InputModel, TM extends ToneMap> = UnionToIntersection<{
  [TN in keyof TM]: TM[TN] extends Tone<any, infer S>
    ? SubtoneEntriesForTone<I, TN, S>
    : {}
}[keyof TM]>;

type PaletteResult<I extends InputModel, TM extends ToneMap> = {
    [K in keyof I]: I[K] & ReturnType<PaletteConfig<TM>["base"]>;
} & {
    [K in keyof I as `${string & K}_${string & keyof TM}`]: ReturnType<TM[keyof TM]>;
} & AllSubtoneEntries<I, TM>;

export function createPalette<
    I extends InputModel,
    TM extends ToneMap
>(
    input: I,
    config: PaletteConfig<TM>
): PaletteResult<I, TM> {
    const getBaseTone = config.base;
    const tones = config.tones;

    const resultObj = {} as Record<string, ColorResultData>;

    for (const key in input) {
        const colorData = input[key] as ColorData;

        resultObj[key] = {
            ...colorData,
            ...getBaseTone(colorData),
        };

        for (const toneKey in tones) {
            const getTone = tones[toneKey];

            resultObj[`${key}_${toneKey}`] = getTone(colorData);

            if (getTone.subtone) {
                for (const subtoneKey in getTone.subtone) {
                    const getSubtone = getTone.subtone[subtoneKey];
                    resultObj[`${key}_${subtoneKey}_${toneKey}`] = getSubtone(colorData);
                }
            }
        }
    }

    return resultObj as PaletteResult<I, TM>;
}

