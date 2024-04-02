"use client";

import { hexToRgb } from "@/util/hex-to-rgb";
import { Color, Solver } from "@/util/rgb-to-hue";
import { useMemo } from "react";

export const useFilter = (hex: string | undefined) =>
  useMemo(() => {
    if (!hex) return null;

    const rgb = hexToRgb(hex);

    if (!rgb) throw Error("Invalid hex");

    const [r, g, b] = rgb;

    const color = new Color(r, g, b);
    const solver = new Solver(color);
    const result = solver.solve();

    return result.filter;
  }, [hex]);
