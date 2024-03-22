import {
  type Accessor,
  createContext,
  useContext,
  type ParentProps,
} from "solid-js";

const EditModeContext = createContext<Accessor<boolean>>();

export function EditModeProvider(props: ParentProps<{ editMode: boolean }>) {
  return (
    // eslint-disable-next-line solid/reactivity -- Accessing reactive props
    <EditModeContext.Provider value={() => props.editMode}>
      {props.children}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  const editMode = useContext(EditModeContext);
  if (!editMode) throw new Error("Forgot to add EditModeProvider");

  return editMode;
}
