export type ColorsUnion = 'red' | 'green' | 'blue' | 'yellow';

export type ColorData = {
    main: string;
    dark: string;
    light: string;
    extra: string;
};

export type InputModel = Record<ColorsUnion, ColorData>;

export type ToneCallback<T extends ColorData, R> = (data: T) => R;

export type SubtoneMap<T extends ColorData> = Record<
    string,
    ToneCallback<T, Record<string, string>>
>;

export type Tone<T extends ColorData, R> = ToneCallback<T, R> & {
    toneName?: string;
    subtone?: SubtoneMap<T>;
};

export type ToneMap<T extends ColorData> = Record<string, Tone<T, any>>;

export type PaletteConfig<T extends ColorData, TM extends ToneMap<T>> = {
    base: Tone<T, any>;
    tones: TM;
};