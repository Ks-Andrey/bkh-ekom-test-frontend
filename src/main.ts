import { InputModel, createPalette, createTone } from "./Palette";

const input = {
    red: {
        main: 'red',
        dark: 'darkred',
        light: 'lightred',
        extra: 'extrared',
    },
    green: {
        main: 'green',
        dark: 'darkgreen',
        light: 'lightgreen',
        extra: 'extragreen',
    },
    blue: {
        main: 'blue',
        dark: 'darkblue',
        light: 'lightblue',
        extra: 'extrablue',
    },
    yellow: {
        main: 'yellow',
        dark: 'darkyellow',
        light: 'lightyellow',
        extra: 'extrayellow',
    },
} satisfies InputModel;

const baseColors = createTone((data) => ({
    background: data.main,
    color: data.main,
}));

const brightness = createTone(
    (data) => ({
        foreground: data.main,
        customProp: "#f0f0f0",
    }),
    {
        name: "brightness",
        subtone: {
            low: (data) => ({ white: data.light }),
            medium: (data) => ({ shadow: data.main }),
            high: (data) => ({
                someProp: "transparent",
                anotherProp: "#fff",
                thirdCustomProp: data.main,
            }),
            ultra: (data) => ({ intensive: data.extra }),
        },
    }
);

const depths = createTone(
    (data) => ({
        background: data.light,
        foreground: data.main,
        color: data.extra,
    }),
    {
        name: "depth",
        subtone: {
            "8-bit": (data) => ({ borderColor: data.main }),
            "16-bit": (data) => ({
                borderColor: data.main,
                anotherColor: data.light,
            }),
            "24-bit": (data) => ({ extraColor: data.extra }),
        },
    }
);

const colors = createPalette(input, {
  base: baseColors,
  tones: {
    brightness,
    depths,
  },
});

console.log(colors);