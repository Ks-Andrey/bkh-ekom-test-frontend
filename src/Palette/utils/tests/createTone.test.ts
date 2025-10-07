import { createTone } from "../createTone";
import { ColorData, ColorResultData } from "../../model/types";

describe("createTone", () => {
    it("должен создать тон и вернуть правильный результат", () => {
        const tone = createTone((data) => ({
            background: data.main,
            color: data.dark,
        }));

        const result = tone({
            main: "red",
            dark: "darkred",
            light: "lightred",
            extra: "extrared",
        });

        expect(result).toEqual({
            background: "red",
            color: "darkred",
        });
    });

    it("должен корректно сохранять имя тона и subtone", () => {
        const subtoneMock = {
            low: (data: ColorData) => ({ white: data.light }),
        };

        const tone = createTone(
            (data) => ({ background: data.main }),
            {
                name: "brightness",
                subtone: subtoneMock,
            }
        );

        expect(tone.toneName).toBe("brightness");
        expect(tone.subtone).toBe(subtoneMock);
    });
});
