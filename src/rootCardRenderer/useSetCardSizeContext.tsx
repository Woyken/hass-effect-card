import { createContext, useContext, type ParentProps } from "solid-js";

const SetCardSizeContext = createContext<(cardSize: number) => void>();

export function SetCardSizeProvider(
  props: ParentProps<{
    setCardSize: (cardSize: number) => void;
  }>
) {
  return (
    // eslint-disable-next-line solid/reactivity -- Passing function, this is fine
    <SetCardSizeContext.Provider value={props.setCardSize}>
      {props.children}
    </SetCardSizeContext.Provider>
  );
}

export function useSetCardSize() {
  const setCardSize = useContext(SetCardSizeContext);
  if (!setCardSize) throw new Error("Forgot to add SetCardSizeProvider");

  return setCardSize;
}
