"use client";

import * as React from "react";

import { PickerMenu, PickerRoot, PickerTrigger, PickerValue } from "./picker";
import { useStore } from "@/shared/hooks/use-store";
import { WatchCaseIcon } from "@/shared/components/icons/case";
import { hslToHex } from "@/util/hsl-to-hex";
import { WatchFaceIcon } from "@/shared/components/icons/face";
import { WatchMouthIcon } from "@/shared/components/icons/mouth";
import {
  Accordion,
  AccordionSummary,
} from "@/shared/components/styled/accordion";

type PickerProps = { id: string; type?: "color" };

const Picker: React.FC<PickerProps & React.PropsWithChildren> = ({
  id,
  children,
}) => {
  const { colors } = useStore();

  const color = colors.get(id);

  return (
    <PickerTrigger
      id={id}
      className="bg-white/5 hover:bg-white/10 transition-all w-full rounded-full flex gap-2 items-center p-1.5"
    >
      <div
        style={{ background: color || "#000" }}
        className="w-8 h-8 rounded-full shrink-0 transition-all z-50"
      />
      {children}
    </PickerTrigger>
  );
};

const CategoryTitle: React.FC<
  React.PropsWithChildren & { icon: React.ReactNode }
> = ({ children, icon }) => {
  return (
    <div className="flex gap-5 w-full items-center">
      {icon}
      <p className="uppercase font-light tracking-widest">{children}</p>
    </div>
  );
};

export default function Sidebar() {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const { setColor } = useStore();

  const handleColorChange = (id: string, value: PickerValue) => {
    if (value.source === "hsl") {
      // Reduce saturation and lightness to make the color realistic
      setColor(id, hslToHex(value.h, 30, 10));
    } else {
      // Set the color as it is
      setColor(id, value.hex);
    }
  };

  return (
    <PickerRoot onChange={handleColorChange}>
      <PickerMenu className="absolute p-4 flex flex-col gap-4 top-0 left-[-40px] bg-zinc-700" />
      <div className=" text-white p-7 flex flex-col h-full overflow-auto">
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          className="relative"
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            className="p-0 transition-all"
            id="panel1d-header"
            style={{
              borderWidth: expanded !== "panel1" ? "1px" : 0,
            }}
          >
            <CategoryTitle icon={<WatchCaseIcon />}>Case parts</CategoryTitle>
          </AccordionSummary>

          <div className="flex flex-col gap-2.5 py-2.5">
            <Picker id="strap">Strap</Picker>
            <Picker id="lining">Lining</Picker>
            <Picker id="stitches">Stitching</Picker>
          </div>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          className="relative"
        >
          <AccordionSummary
            aria-controls="panel1d-content"
            className="p-0 transition-all"
            id="panel1d-header"
            style={{
              borderWidth: expanded !== "panel2" ? "1px" : 0,
            }}
          >
            <CategoryTitle icon={<WatchFaceIcon />}>Face</CategoryTitle>
          </AccordionSummary>

          <div className="flex flex-col gap-2.5 py-2.5">
            <Picker id="face">Dial plate</Picker>
            <Picker id="bezel">Rim</Picker>
            <Picker id="eyes">Eye glasses</Picker>
            <Picker id="numbers">Numbers scale</Picker>
            <Picker id="pupils">Eye color</Picker>
            <Picker id="iris">Pupils</Picker>
            <Picker id="nose">Nose</Picker>
            <Picker id="brand-plate">Logo plate</Picker>
            <Picker id="brand">Logo</Picker>
          </div>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          className="relative"
        >
          <AccordionSummary
            aria-controls="panel3d-content"
            className="p-0 transition-all"
            id="panel1d-header"
            style={{
              borderWidth: expanded !== "panel3" ? "1px" : 0,
            }}
          >
            <CategoryTitle icon={<WatchMouthIcon />}>Mouth</CategoryTitle>
          </AccordionSummary>

          <div className="flex flex-col gap-2.5 py-2.5">
            <Picker id="tongue">Tongue</Picker>
            <Picker id="mouth">Lunar disk</Picker>
            <Picker id="lips">Lips</Picker>
          </div>
        </Accordion>

        <div className="flex w-full mt-[30px] mb-[20px] gap-3.5">
          <button className="w-full rounded-full border border-white/25 h-[50px] hover:bg-white/25">
            Random
          </button>
          <button className="w-full rounded-full border border-white/25 h-[50px] hover:bg-white/25">
            Reset
          </button>
        </div>

        <div className="mt-auto w-full flex flex-col gap-6">
          <div className="flex gap-[30px]">
            <div className="flex flex-col gap-2.5">
              <p className="text-[14px] text-white/50">Price</p>
              <p className="text-[18px]">30 000</p>
            </div>
            <div className="flex flex-col gap-2.5">
              <p className="text-[14px] text-white/50">Lead time</p>
              <p className="text-[18px]">12 MONTHS</p>
            </div>
          </div>
          <button className="h-[60px] rounded-full bg-white text-black w-full">
            Place order
          </button>
        </div>
      </div>
    </PickerRoot>
  );
}
