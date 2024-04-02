import { createEditorStore } from "@/store/editor";
import { createContext } from "react";

const EditorStoreContext = createContext<ReturnType<
  typeof createEditorStore
> | null>(null);

export const Provider = EditorStoreContext.Provider;
export default EditorStoreContext;
