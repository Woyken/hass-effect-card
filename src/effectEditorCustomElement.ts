import { type HomeAssistant } from "custom-card-helpers";
import { parse as vparse } from "valibot";
import {
  type UserConfigSchema,
  effectCardConfigSchema,
} from "./cardConfigSchema/cardConfigSchema";
import { type RenderEditorResult } from "./editor/renderEditor";

export class ContentCardEditor extends HTMLElement {
  private _config?: UserConfigSchema;
  private _hass?: HomeAssistant;
  private _editMode: boolean = false;
  private _cardSize = 0;
  private _cardRenderResult?: Promise<RenderEditorResult>;

  public connectedCallback() {
    this._cardRenderResult = import("./editor/renderEditor").then(
      ({ renderEditor }) =>
        renderEditor(
          this,
          (cardSize) => (this._cardSize = cardSize),
          (c) => {
            this.emitConfigChangedEvent(c);
          },
          this._hass,
          this._config,
          this._editMode
        )
    );
    this.addEventListener("set-config", () => {});
  }

  public disconnectedCallback() {
    void this._cardRenderResult?.then((dispose) => {
      dispose.disposeRender();
    });
  }

  // HA API
  // eslint-disable-next-line accessor-pairs
  public set hass(hass: HomeAssistant) {
    this._hass = hass;
    void this._cardRenderResult?.then((renderer) => renderer.setHass(hass));
  }

  // HA API
  // eslint-disable-next-line accessor-pairs
  public set editMode(editMode: boolean) {
    this._editMode = editMode;
    void this._cardRenderResult?.then((renderer) =>
      renderer.setEditMode(editMode)
    );
  }

  // HA API
  public setConfig(config: unknown) {
    // TODO
    // editor set config
    // Object { type: "custom:effect-card", effectType: "magic-snowflakes", color: "#5ECDEF" }
    // editor after parse config
    // Object { effectType: "magic-snowflakes", color: "#5ECDEF" }

    const userConfigParseResult = vparse(effectCardConfigSchema, config);
    this._config = userConfigParseResult;
    void this._cardRenderResult?.then((renderer) =>
      renderer.setCardConfig(userConfigParseResult)
    );
  }

  // HA API
  public getCardSize(): number {
    return this._cardSize;
  }

  private emitConfigChangedEvent(newConfig: UserConfigSchema) {
    // HA API, listening to "config-changed" event
    console.log("emit config changed!", newConfig);
    const event = new CustomEvent("config-changed", {
      detail: { config: newConfig },
    });
    this.dispatchEvent(event);
  }
}

customElements.define("effect-card-editor", ContentCardEditor);
const windowWithCards = window as unknown as Window & {
  customCards: unknown[] | undefined;
};
windowWithCards.customCards = windowWithCards.customCards ?? [];
windowWithCards.customCards.push({
  type: "effect-card",
  name: "Effect card",
  preview: false,
  description: "Effect card / Make it snow!",
  documentationURL:
    "https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/",
});
