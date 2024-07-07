import {
  type Accessor,
  createContext,
  useContext,
  type ParentProps,
} from "solid-js";
import { createComponent2 } from "../signal2";
import { type EditorConfigSchema } from "../cardConfigSchema/editorConfigSchema";

const EditorConfigContext =
  createContext<Accessor<EditorConfigSchema | undefined>>();

export const EditorConfigProvider = createComponent2<
  ParentProps<{ editorConfig?: EditorConfigSchema }>
>((props) => {
  return (
    // eslint-disable-next-line solid/reactivity -- Accessing reactive props
    <EditorConfigContext.Provider value={props.editorConfig}>
      {props.children()}
    </EditorConfigContext.Provider>
  );
});

export function useEditorConfig() {
  const editorConfig = useContext(EditorConfigContext);
  if (!editorConfig) throw new Error("Forgot to add EditorConfigProvider");

  return editorConfig;
}
