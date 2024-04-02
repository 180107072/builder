import { MouseEvent, TouchEvent } from "react";

export const calculateChange = (
  e: unknown,
  hsl: { h: number; s: number; l: number; a: number },
  container: HTMLDivElement
) => {
  const agnosticEvents = e as MouseEvent<HTMLButtonElement, MouseEvent> &
    TouchEvent<HTMLButtonElement>;
  const containerWidth = container.clientWidth;

  const x =
    typeof agnosticEvents.pageX === "number"
      ? agnosticEvents.pageX
      : agnosticEvents.touches[0].pageX;

  const left = x - (container.getBoundingClientRect().left + window.scrollX);

  let h;
  if (left < 0) {
    h = 0;
  } else if (left > containerWidth) {
    h = 359;
  } else {
    const percent = (left * 100) / containerWidth;
    h = (360 * percent) / 100;
  }

  return {
    h,
    s: hsl.s,
    l: hsl.l,
    a: hsl.a,
    source: "hsl",
  };
};
