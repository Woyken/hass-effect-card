import { render } from "solid-js/web";
import { type HomeAssistant } from "custom-card-helpers";
import { type UserConfigSchema } from "../cardConfigSchema/cardConfigSchema";
import { RootCard } from "../rootCard";
import { HassProvider } from "./useHassContext";
import { EditModeProvider } from "./useEditModeContext";
import { CardConfigProvider } from "./useCardConfigContext";
import { SetCardSizeProvider } from "./useSetCardSizeContext";
import { createSignal2 } from "../signal2";

export type RenderRootCardResult = ReturnType<typeof renderRootCard>;

export function renderRootCard(
  rootElement: HTMLElement,
  setCardSize: (cardSize: number) => void,
  initialHass?: HomeAssistant,
  initialCardConfig?: UserConfigSchema,
  initialEditMode: boolean = false
) {
  const hass = createSignal2<HomeAssistant | undefined>(initialHass);
  const cardConfig = createSignal2<UserConfigSchema | undefined>(
    initialCardConfig
  );
  const editMode = createSignal2<boolean>(initialEditMode);

  const disposeRender = render(() => {
    return (
      <SetCardSizeProvider setCardSize={setCardSize}>
        <HassProvider hass={hass.get()}>
          <CardConfigProvider cardConfig={cardConfig.get()}>
            <EditModeProvider editMode={editMode.get()}>
              <RootCard />
            </EditModeProvider>
          </CardConfigProvider>
        </HassProvider>
      </SetCardSizeProvider>
    );
  }, rootElement);
  return {
    disposeRender,
    setHass: hass.set,
    setCardConfig: cardConfig.set,
    setEditMode: editMode.set,
  };
}
