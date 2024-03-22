import {
  createContext,
  useContext,
  type ParentProps,
  type Setter,
} from "solid-js";
import { type UserConfigSchema } from "../cardConfigSchema/cardConfigSchema";

const CardConfigPublisherContext =
  createContext<Setter<UserConfigSchema | undefined>>();

export function CardConfigPublisherProvider(
  props: ParentProps<{
    cardConfigPublisher: Setter<UserConfigSchema | undefined>;
  }>
) {
  return (
    // eslint-disable-next-line solid/reactivity -- Accessing reactive props
    <CardConfigPublisherContext.Provider value={props.cardConfigPublisher}>
      {props.children}
    </CardConfigPublisherContext.Provider>
  );
}

export function useCardConfigPublisher() {
  const cardConfig = useContext(CardConfigPublisherContext);
  if (!cardConfig) throw new Error("Forgot to add CardConfigPublisherProvider");

  return cardConfig;
}
