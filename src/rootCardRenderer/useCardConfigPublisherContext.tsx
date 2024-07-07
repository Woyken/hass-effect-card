import {
  createContext,
  useContext,
  type ParentProps,
  type Setter,
} from "solid-js";
import { createComponent2 } from "../signal2";
import { type EditorConfigSchema } from "../cardConfigSchema/editorConfigSchema";

const EditorConfigPublisherContext =
  createContext<Setter<EditorConfigSchema | undefined>>();

export const EditorConfigPublisherProvider = createComponent2<
  ParentProps<{
    editorConfigPublisher: Setter<EditorConfigSchema | undefined>;
  }>
>((props) => {
  return (
    <EditorConfigPublisherContext.Provider
      // eslint-disable-next-line solid/reactivity -- Accessing reactive props
      value={props.editorConfigPublisher()}
    >
      {props.children()}
    </EditorConfigPublisherContext.Provider>
  );
});

export function useEditorConfigPublisher() {
  const editorConfig = useContext(EditorConfigPublisherContext);
  if (!editorConfig)
    throw new Error("Forgot to add EditorConfigPublisherProvider");

  return editorConfig;
}
