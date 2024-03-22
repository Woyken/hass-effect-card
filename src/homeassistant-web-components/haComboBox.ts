import type { ComboBoxDataProvider } from "@vaadin/combo-box";
import type { ComboBoxLitRenderer } from "@vaadin/combo-box/lit";
import type { HomeAssistant } from "custom-card-helpers";
import type { LitElement } from "lit";

// https://github.com/home-assistant/frontend/blob/dev/src/components/ha-combo-box.ts

/*
const customElement = customElements.get('ha-combo-box');

const obsAttr = customElement.observedAttributes;
console.log("element attributes:\n", obsAttr.join('\n'));
const elProps = Array.from(customElement.elementProperties.keys());
const attributeNameToPropertyNameMap = customElement._$Ev;
const propsWithoutAttr = elProps.filter(x => !obsAttr.map(i => attributeNameToPropertyNameMap.get(i)).includes(x));
console.log("properties that don't map to attributes:\n", propsWithoutAttr.join('\n'));
*/

type Events = {
  "opened-changed": { value?: string };
  "value-changed": { value?: string };
  "filter-changed": { value: string };
};

type Properties = {
  label?: string;
  value?: string;
  placeholder?: string;
  validationMessage?: string;
  helper?: string;
  /* attribute: "error-message" */
  errorMessage?: string;
  invalid?: boolean;
  icon?: boolean;
  /* attribute: "allow-custom-value" */
  allowCustomValue?: boolean;
  /* attribute: "item-value-path", default: "value" */
  itemValuePath?: string;
  /* attribute: "item-label-path", default: "label" */
  itemLabelPath?: string;
  /* attribute: "item-id-path" */
  itemIdPath?: string;
  /* default: false */
  disabled?: boolean;
  /* default: false */
  required?: boolean;
  /* default: false */
  opened?: boolean;

  items?: unknown[];
} & ConvertEventsToProperties<Events>;

export type HaComboBoxLitElement = Overwrite<
  LitElement,
  Properties & {
    hass?: HomeAssistant;
    items?: unknown[];
    filteredItems?: unknown[];
    dataProvider?: ComboBoxDataProvider<unknown>;
    renderer?: ComboBoxLitRenderer<unknown>;
    open: () => Promise<void>;
    focus: () => Promise<void>;
    get selectedItem(): unknown;
    setInputValue: (value: string) => void;
  }
>;

declare module "solid-js" {
  // eslint-disable-next-line @typescript-eslint/no-namespace -- overwriting existing declarations
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- we need to assign a lot of properties through prop:___
    interface ExplicitProperties extends Properties {
    }

    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- overwriting existing declarations
    interface IntrinsicElements {
      "ha-combo-box": JSX.DOMAttributes<HaComboBoxLitElement> &
        Properties;
    }
  }
}
