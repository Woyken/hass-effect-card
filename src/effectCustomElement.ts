import type { LovelaceCard, HomeAssistant } from "custom-card-helpers";
import { parse as vparse } from "valibot";
import {
  type UserConfigSchema,
  effectCardConfigSchema,
} from "./cardConfigSchema/cardConfigSchema";
import { type RenderRootCardResult } from "./rootCardRenderer/rootCardRenderer";

class ContentCardExample extends HTMLElement implements LovelaceCard {
  private _config?: UserConfigSchema;
  private _hass?: HomeAssistant;
  private _editMode: boolean = false;
  private _cardSize = 0;
  private _cardRenderResult?: Promise<RenderRootCardResult>;

  public connectedCallback() {
    this._cardRenderResult = import("./rootCardRenderer/rootCardRenderer").then(
      ({ renderRootCard }) =>
        renderRootCard(
          this,
          (cardSize) => (this._cardSize = cardSize),
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
    if (editMode) void import("./effectEditorCustomElement");
    this._editMode = editMode;
    void this._cardRenderResult?.then((renderer) =>
      renderer.setEditMode(editMode)
    );
  }

  // HA API
  public setConfig(config: unknown) {
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

  // HA API
  public static getConfigElement() {
    void import("./effectEditorCustomElement");
    return document.createElement("effect-card-editor");
  }

  // HA API
  public static getStubConfig(): Omit<UserConfigSchema, "type"> {
    return { effectType: "magic-snowflakes" };
  }
}

customElements.define("effect-card", ContentCardExample);
