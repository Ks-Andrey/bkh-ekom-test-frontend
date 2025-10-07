export type ColorsUnion = 'red' | 'green' | 'blue' | 'yellow';

export type ColorData = {
    main: string;
    dark: string;
    light: string;
    extra: string;
};

export type InputModel = Record<ColorsUnion, ColorData>;

export type ColorResultData = Record<string, string>;

export type ToneCallback<T extends ColorData, R> = (data: T) => R;

export type Tone<
    R,
    S extends Record<string, (data: ColorData) => ColorResultData> = {}
> = ((data: ColorData) => R) & {
    toneName?: string;
    subtone?: S;
};

export type ToneMap = Record<string, Tone<ColorResultData, any>>;
