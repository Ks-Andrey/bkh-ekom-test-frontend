import { createPalette } from '../createPalette'
import { createTone } from '../createTone';

describe("createPalette", () => {
    const input = {
        red: { main: "red", dark: "darkred", light: "lightred", extra: "extrared" },
        green: { main: "green", dark: "darkgreen", light: "lightgreen", extra: "extragreen" },
        blue: { main: 'blue', dark: 'darkblue', light: 'lightblue', extra: 'extrablue' },
        yellow: { main: 'yellow', dark: 'darkyellow', light: 'lightyellow', extra: 'extrayellow' },
    };

    const baseTone = createTone((data) => ({
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
                high: (data) => ({ shadow: data.dark }),
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
            },
        }
    );

    const tones = { brightness, depths };

    it("должен создать палитру с базовыми тонами и всеми субтонами", () => {
        const palette = createPalette(input, {
            base: baseTone,
            tones,
        });

        expect(palette.red).toEqual({
            main: "red",
            dark: "darkred",
            light: "lightred",
            extra: "extrared",
            background: "red",
            color: "red",
        });

        expect(palette.red_brightness).toEqual({
            foreground: "red",
            customProp: "#f0f0f0",
        });

        expect(palette.red_low_brightness).toEqual({
            white: "lightred",
        });

        expect(palette.red_high_brightness).toEqual({
            shadow: "darkred",
        });

        expect(palette.red_depths).toEqual({
            background: "lightred",
            foreground: "red",
            color: "extrared",
        });

        expect(palette['red_8-bit_depths']).toEqual({
            borderColor: "red",
        });
    });

    it("должен корректно работать для другого цвета", () => {
        const palette = createPalette(input, {
            base: baseTone,
            tones,
        });

        expect(palette.green).toEqual({
            main: "green",
            dark: "darkgreen",
            light: "lightgreen",
            extra: "extragreen",
            background: "green",
            color: "green",
        });

        expect(palette.green_brightness).toEqual({
            foreground: "green",
            customProp: "#f0f0f0",
        });

        expect(palette.green_low_brightness).toEqual({
            white: "lightgreen",
        });
    });
});
