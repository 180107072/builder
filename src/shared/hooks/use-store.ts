import { useContext, useMemo } from "react";
import { useStoreWithEqualityFn as useZustandStore } from "zustand/traditional";
import type { StoreApi } from "zustand";

import { Descriptor, EditorStore } from "@/store/editor";
import EditorStoreContext from "../contexts/editor-context";

const zustandErrorMessage =
  "No store found. Make sure to wrap your component with <EditorProvider>";

type _ExtractState<R extends Descriptor> = StoreApi<EditorStore> extends {
  getState: () => infer T;
}
  ? T
  : never;

function useStore<T extends Descriptor>() {
  const store = useContext(EditorStoreContext);

  if (store === null) {
    throw new Error(zustandErrorMessage);
  }

  return useZustandStore(store) as EditorStore;
}

const useStoreApi = () => {
  const store = useContext(EditorStoreContext);

  if (store === null) {
    throw new Error(zustandErrorMessage);
  }

  return useMemo(
    () => ({
      getState: store.getState,
      setState: store.setState,
      subscribe: store.subscribe,
    }),
    [store]
  );
};

export { useStore, useStoreApi };
