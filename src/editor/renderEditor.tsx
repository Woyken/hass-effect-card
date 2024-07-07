import { render } from "solid-js/web";
import { type HomeAssistant } from "custom-card-helpers";
import { EditModeProvider } from "../rootCardRenderer/useEditModeContext";
import { HassProvider } from "../rootCardRenderer/useHassContext";
import { SetCardSizeProvider } from "../rootCardRenderer/useSetCardSizeContext";
import { EditorCard } from "./editorCard";
import { createEffect, untrack } from "solid-js";
import { createSignal2 } from "../signal2";
import { type EditorConfigSchema } from "../cardConfigSchema/editorConfigSchema";
import { EditorConfigProvider } from "../rootCardRenderer/useEditorConfigContext";
import { EditorConfigPublisherProvider } from "../rootCardRenderer/useCardConfigPublisherContext";

export type RenderEditorResult = ReturnType<typeof renderEditor>;

export function renderEditor(
  rootElement: HTMLElement,
  setCardSize: (cardSize: number) => void,
  emitConfigChangedEvent: (c: EditorConfigSchema) => void,
  initialHass?: HomeAssistant,
  initialCardConfig?: EditorConfigSchema,
  initialEditMode: boolean = false
) {
  const hass = createSignal2<HomeAssistant | undefined>(initialHass);
  const internalCardConfig = createSignal2<EditorConfigSchema | undefined>(
    initialCardConfig
  );
  const editMode = createSignal2<boolean>(initialEditMode);

  const currentCardConfig = createSignal2<EditorConfigSchema | undefined>(
    initialCardConfig
  );

  createEffect(() => {
    // When new config is received from parent, update internal config
    const currConfig = currentCardConfig.get();
    internalCardConfig.set(currConfig);
  });

  createEffect(() => {
    // When internal publishes, set card config
    const intConfig = internalCardConfig.get();
    if (
      JSON.stringify(untrack(() => currentCardConfig.get())) !==
      JSON.stringify(intConfig)
    ) {
      console.log("CFG! definitely changed");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      emitConfigChangedEvent(JSON.parse(JSON.stringify(intConfig)));
    }
  });

  // createEffect(() => {
  //   console.log("CFG!");
  //   const c = internalCardConfig.get();
  //   // TODO when config is updated, initial is not eq current, always emit loops...
  //   if (c && c !== initialCardConfig) emitConfigChangedEvent(c);
  // });

  const disposeRender = render(
    () => (
      <SetCardSizeProvider setCardSize={setCardSize}>
        <HassProvider hass={hass.get()}>
          <EditorConfigProvider editorConfig={internalCardConfig.get()}>
            <EditorConfigPublisherProvider
              editorConfigPublisher={internalCardConfig.set}
            >
              <EditModeProvider editMode={editMode.get()}>
                <EditorCard />
              </EditModeProvider>
            </EditorConfigPublisherProvider>
          </EditorConfigProvider>
        </HassProvider>
      </SetCardSizeProvider>
    ),
    rootElement
  );
  return {
    disposeRender,
    setHass: hass.set,
    setCardConfig: currentCardConfig.set,
    setEditMode: editMode.set,
  };
}
// CFG! renderEditor.js:1592:13
// emit config changed!
// Object { type: "custom:effect-card", effectType: "magic-snowflakes" }
// effectEditorCustomElement.js:70:13
// ha set config,
// Object { type: "custom:effect-card", effectType: "magic-snowflakes" }
// effectEditorCustomElement.js:58:13
// transform color undefined index.js:575:19
// CFG! renderEditor.js:1592:13
// emit config changed!
// Object { type: "custom:effect-card", effectType: "magic-snowflakes", color: "aa" }
// effectEditorCustomElement.js:70:13
// ha set config,
// Object { type: "custom:effect-card", effectType: "magic-snowflakes", color: "aa" }
// effectEditorCustomElement.js:58:13
// transform color aa 2 index.js:575:19
// CFG! renderEditor.js:1592:13
// emit config changed!
// Object { type: "custom:effect-card", effectType: "magic-snowflakes" }
// effectEditorCustomElement.js:70:13
// ha set config,
// Object { type: "custom:effect-card", effectType: "magic-snowflakes" }
// effectEditorCustomElement.js:58:13
// transform color undefined index.js:575:19
// CFG! renderEditor.js:1592:13
// emit config changed!
// Object { type: "custom:effect-card", effectType: "magic-snowflakes", color: "aa" }
// effectEditorCustomElement.js:70:13
// ha set config,
// Object { type: "custom:effect-card", effectType: "magic-snowflakes", color: "aa" }
// effectEditorCustomElement.js:58:13
// transform color aa 2 index.js:575:19
