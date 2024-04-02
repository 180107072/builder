import { commonColors } from "@/data/common/shared-colors";
import {
  createContext,
  FC,
  HTMLAttributes,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { calculateChange } from "@/util/calculate-hue";

import { usePickerOutsideClick } from "./hooks/use-picker-outside-click";

type HEX = {
  hex: string;
  source: "hex";
};

type HSL = {
  h: number;
  s: number;
  l: number;
  a: number;
  source: "hsl";
};

export type PickerValue = HEX | HSL;

type Position = {
  x: number;
  y: number;
};

type PickerRootProps = {
  onChange: (id: string, value: HSL | HEX) => void;
};

type PickerContextProps = {
  open: string | null;
  setOpen: (value: string | null) => void;
  position: Position;
  setPosition: (value: Position) => void;
};

const PickerContext = createContext<
  (PickerRootProps & PickerContextProps) | undefined
>(undefined);

export const usePicker = () => {
  const context = useContext(PickerContext);
  if (!context) {
    throw new Error("usePicker must be used within a PickerRoot");
  }
  return context;
};

export const PickerRoot: FC<PickerRootProps & PropsWithChildren> = ({
  onChange,
  children,
}) => {
  const [open, setOpen] = useState<string | null>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const ref = useRef<HTMLDivElement>(null);

  return (
    <PickerContext.Provider
      value={{
        open,
        position,
        onChange,
        setOpen,
        setPosition,
      }}
    >
      <div className="w-full h-full relative" ref={ref}>
        {children}
      </div>
    </PickerContext.Provider>
  );
};

export const PickerTrigger: FC<
  HTMLAttributes<HTMLButtonElement> & { id: string }
> = (props) => {
  const { setOpen, setPosition } = usePicker();

  const ref = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={ref}
      data-trigger={props.id}
      onFocus={(e) => {
        const rect = ref.current?.getBoundingClientRect();

        if (rect) {
          setPosition({
            x: rect.left,
            y: rect.top,
          });
        }

        setOpen(props.id);
      }}
      {...props}
    />
  );
};

export const PickerMenu: FC<HTMLAttributes<HTMLDivElement>> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  usePickerOutsideClick(wrapperRef);

  const [hsl, setHsl] = useState({ h: 0, s: 0, l: 0, a: 0 });
  const { open, onChange, position } = usePicker();
  const motionX = useMotionValue(0);

  const handleChange = (e: Event) => {
    const containerElement = containerRef.current;

    if (!containerElement) return;
    const change = calculateChange(e, hsl, containerElement);
    if (change) {
      setHsl(change);

      const data = { a: 1, h: change.h, l: 0.5, s: 1 };

      onChange(open!, { ...data, source: "hsl" });

      motionX.set(change.h);
    }
  };

  const left = useTransform(
    motionX,
    (input) => `${Math.round((input * 97) / 360)}%`
  );

  const handleMouseDown = () => {
    document.addEventListener("mousemove", handleChange);

    document.addEventListener("mouseup", (e) => {
      e.stopPropagation();
      document.removeEventListener("mousemove", handleChange);
      document.removeEventListener("mouseup", handleChange);
    });
  };

  return (
    <AnimatePresence mode="wait">
      {open !== null ? (
        <motion.div
          ref={wrapperRef}
          layout
          layoutId="picker-menu"
          className="absolute bg-[#2A2B2D] z-50 p-4 flex flex-col gap-4 w-full h-fit -ml-4 -left-full top-0"
          initial={{ opacity: 0, y: position.y }}
          animate={{ opacity: 1, y: position.y }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            className="hue h-2 flex items-center rounded-full w-full relative"
          >
            <motion.button
              ref={buttonRef}
              className="h-3 w-3 rounded-full left-0 border-2 absolute border-white"
              whileTap={{ scale: 2 }}
              style={{
                left,
                background: `hsl(${hsl.h}, 100%, 50%)`,
              }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {commonColors.map((hex) => {
              return (
                <button
                  className={` border-2 border-transparent hover:border-zinc-300 transition-all shrink-0 w-[27px] h-[27px] rounded-full`}
                  onClick={() => {
                    onChange(open, {
                      hex,
                      source: "hex",
                    });
                  }}
                  key={hex}
                  style={{
                    backgroundColor: hex,
                  }}
                />
              );
            })}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
