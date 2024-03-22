import { render } from "solid-js/web";
import { type HomeAssistant } from "custom-card-helpers";
import { type UserConfigSchema } from "../cardConfigSchema/cardConfigSchema";
import { CardConfigProvider } from "../rootCardRenderer/useCardConfigContext";
import { EditModeProvider } from "../rootCardRenderer/useEditModeContext";
import { HassProvider } from "../rootCardRenderer/useHassContext";
import { SetCardSizeProvider } from "../rootCardRenderer/useSetCardSizeContext";
import { EditorCard } from "./editorCard";
import { createEffect, createSignal } from "solid-js";
import { CardConfigPublisherProvider } from "../rootCardRenderer/useCardConfigPublisherContext";

export type RenderEditorResult = ReturnType<typeof renderEditor>;

export function renderEditor(
  rootElement: HTMLElement,
  setCardSize: (cardSize: number) => void,
  emitConfigChangedEvent: (c: UserConfigSchema) => void,
  initialHass?: HomeAssistant,
  initialCardConfig?: UserConfigSchema,
  initialEditMode: boolean = false
) {
  const [hass, setHass] = createSignal<HomeAssistant | undefined>(initialHass);
  const [cardConfig, setCardConfig] = createSignal<
    UserConfigSchema | undefined
  >(initialCardConfig);
  const [editMode, setEditMode] = createSignal<boolean>(initialEditMode);

  createEffect(() => {
    const c = cardConfig();
    if (c) emitConfigChangedEvent(c);
  });

  const disposeRender = render(
    () => (
      <SetCardSizeProvider setCardSize={setCardSize}>
        <HassProvider hass={hass()}>
          <CardConfigProvider cardConfig={cardConfig()}>
            <CardConfigPublisherProvider cardConfigPublisher={setCardConfig}>
              <EditModeProvider editMode={editMode()}>
                <EditorCard />
              </EditModeProvider>
            </CardConfigPublisherProvider>
          </CardConfigProvider>
        </HassProvider>
      </SetCardSizeProvider>
    ),
    rootElement
  );
  return { disposeRender, setHass, setCardConfig, setEditMode };
}
