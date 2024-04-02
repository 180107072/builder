import { RefObject } from "react";
import { useEventListener } from "usehooks-ts";
import { usePicker } from "../picker";

export const triggerCls = "__trigger__";

export const usePickerOutsideClick = (ref: RefObject<HTMLDivElement>) => {
  const { setOpen } = usePicker();

  useEventListener("mousedown", (event) => {
    const target = event.target as HTMLElement;

    const id = target.dataset.trigger ?? target.parentElement?.dataset.trigger;

    if (id) {
      return setOpen(id);
    }

    // Do nothing if the target is not connected element with document
    if (!target || !target.isConnected) {
      return;
    }

    const isOutside = Array.isArray(ref)
      ? ref
          .filter((r) => Boolean(r.current))
          .every((r) => r.current && !r.current.contains(target))
      : ref.current && !ref.current.contains(target);

    if (isOutside) {
      setOpen(null);
    }
  });
};
