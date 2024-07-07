import { type HomeAssistant } from "custom-card-helpers";
import {
  createContext,
  useContext,
  type ParentProps,
  type Accessor,
} from "solid-js";
import { createComponent2 } from "../signal2";

const HassContext = createContext<Accessor<HomeAssistant | undefined>>();

export const HassProvider = createComponent2<
  ParentProps<{ hass?: HomeAssistant }>
>((props) => {
  return (
    // eslint-disable-next-line solid/reactivity -- Accessing reactive props
    <HassContext.Provider value={props.hass}>
      {props.children()}
    </HassContext.Provider>
  );
});

export function useHass() {
  const hass = useContext(HassContext);
  if (!hass) throw new Error("Forgot to add HassProvider");

  return hass;
}
