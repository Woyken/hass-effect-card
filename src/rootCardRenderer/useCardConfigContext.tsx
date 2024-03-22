import {
  type Accessor,
  createContext,
  useContext,
  type ParentProps,
} from "solid-js";
import { type UserConfigSchema } from "../cardConfigSchema/cardConfigSchema";

const CardConfigContext =
  createContext<Accessor<UserConfigSchema | undefined>>();

export function CardConfigProvider(
  props: ParentProps<{ cardConfig?: UserConfigSchema }>
) {
  return (
    // eslint-disable-next-line solid/reactivity -- Accessing reactive props
    <CardConfigContext.Provider value={() => props.cardConfig}>
      {props.children}
    </CardConfigContext.Provider>
  );
}

export function useCardConfig() {
  const cardConfig = useContext(CardConfigContext);
  if (!cardConfig) throw new Error("Forgot to add CardConfigProvider");

  return cardConfig;
}
