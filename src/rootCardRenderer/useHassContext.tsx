import { type HomeAssistant } from "custom-card-helpers";
import {
  createContext,
  useContext,
  type ParentProps,
  type Accessor,
} from "solid-js";

const HassContext = createContext<Accessor<HomeAssistant | undefined>>();

export function HassProvider(props: ParentProps<{ hass?: HomeAssistant }>) {
  return (
    // eslint-disable-next-line solid/reactivity -- Accessing reactive props
    <HassContext.Provider value={() => props.hass}>
      {props.children}
    </HassContext.Provider>
  );
}

export function useHass() {
  const hass = useContext(HassContext);
  if (!hass) throw new Error("Forgot to add HassProvider");

  return hass;
}
