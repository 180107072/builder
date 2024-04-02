"use client";

import { useFilter } from "@/hooks/use-filter";
import { useStore } from "@/shared/hooks/use-store";
import Image from "next/image";
import { FC, useEffect, useRef } from "react";

export type TestImage = {
  id: string;
  url: string;
};

export const TestComponent: FC<{ images: TestImage[] }> = ({ images }) => {
  return images.map(({ id, url }) => {
    return <TestImageComponent url={url} id={id} key={id} />;
  });
};

export const TestImageComponent: FC<TestImage> = ({ url, id }) => {
  const ref = useRef<HTMLImageElement>(null);

  const { colors } = useStore();
  const color = colors.get(id);

  const filter = useFilter(color);

  useEffect(() => {
    if (!ref.current) return;

    if (!color || !filter) return;

    ref.current.style.filter = filter;
    ref.current.style.transition = "filter 0.5s";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  return (
    <Image
      ref={ref}
      className="w-full h-auto absolute  transition-all object-contain"
      src={url}
      alt=""
      fill
      priority
    />
  );
};
