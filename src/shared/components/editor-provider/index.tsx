"use client";

import { Provider } from "@/shared/contexts/editor-context";
import { createEditorStore, Descriptor } from "@/store/editor";
import { enableMapSet } from "immer";
import { type PropsWithChildren, useRef } from "react";

enableMapSet();

export function EditorProvider({
  children,
  descriptor,
}: PropsWithChildren & { descriptor: Descriptor }) {
  const storeRef = useRef<ReturnType<typeof createEditorStore> | null>(null);

  if (!storeRef.current) {
    storeRef.current = createEditorStore(descriptor);
  }

  return <Provider value={storeRef.current}>{children}</Provider>;
}
