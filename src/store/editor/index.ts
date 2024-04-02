import { immer } from "zustand/middleware/immer";
import { Draft } from "immer";
import { createWithEqualityFn } from "zustand/traditional";

export type Descriptor = {
  angles: number;
  case: number;

  parts: string[];
};

export type EditorStore = {
  colors: Map<string, string>;
  setColor: (part: Draft<string>, color: string) => void;
  getColor: (part: string) => string;
} & Descriptor;

export const createEditorStore = (descriptor: Descriptor) =>
  createWithEqualityFn(
    immer<EditorStore>((set, get) => ({
      colors: new Map(),
      setColor: (part, color) => {
        set(({ colors }) => {
          colors.set(part, color);
        });
      },
      getColor: (part) => {
        const state = get();
        const color = state.colors.get(part);

        if (!color) throw Error("Color not found");

        return color;
      },
      ...descriptor,
    })),
    Object.is
  );
