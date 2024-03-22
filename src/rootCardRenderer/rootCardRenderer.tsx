import { render } from "solid-js/web";
import { type HomeAssistant } from "custom-card-helpers";
import { type UserConfigSchema } from "../cardConfigSchema/cardConfigSchema";
import { RootCard } from "../rootCard";
import { HassProvider } from "./useHassContext";
import { EditModeProvider } from "./useEditModeContext";
import { CardConfigProvider } from "./useCardConfigContext";
import { SetCardSizeProvider } from "./useSetCardSizeContext";
import { createSignal } from "solid-js";

export type RenderRootCardResult = ReturnType<typeof renderRootCard>;

export function renderRootCard(
  rootElement: HTMLElement,
  setCardSize: (cardSize: number) => void,
  initialHass?: HomeAssistant,
  initialCardConfig?: UserConfigSchema,
  initialEditMode: boolean = false
) {
  const [hass, setHass] = createSignal<HomeAssistant | undefined>(initialHass);
  const [cardConfig, setCardConfig] = createSignal<
    UserConfigSchema | undefined
  >(initialCardConfig);
  const [editMode, setEditMode] = createSignal<boolean>(initialEditMode);

  const disposeRender = render(() => {
    return (
      <SetCardSizeProvider setCardSize={setCardSize}>
        <HassProvider hass={hass()}>
          <CardConfigProvider cardConfig={cardConfig()}>
            <EditModeProvider editMode={editMode()}>
              <RootCard />
            </EditModeProvider>
          </CardConfigProvider>
        </HassProvider>
      </SetCardSizeProvider>
    );
  }, rootElement);
  return { disposeRender, setHass, setCardConfig, setEditMode };
}

