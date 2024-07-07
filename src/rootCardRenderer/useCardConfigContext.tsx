import {
  type Accessor,
  createContext,
  useContext,
  type ParentProps,
} from "solid-js";
import { type UserConfigSchema } from "../cardConfigSchema/cardConfigSchema";
import { createComponent2 } from "../signal2";

const CardConfigContext =
  createContext<Accessor<UserConfigSchema | undefined>>();

export const CardConfigProvider = createComponent2<
  ParentProps<{ cardConfig?: UserConfigSchema }>
>((props) => {
  return (
    // eslint-disable-next-line solid/reactivity -- Accessing reactive props
    <CardConfigContext.Provider value={props.cardConfig}>
      {props.children()}
    </CardConfigContext.Provider>
  );
});

export function useCardConfig() {
  const cardConfig = useContext(CardConfigContext);
  if (!cardConfig) throw new Error("Forgot to add CardConfigProvider");

  return cardConfig;
}
