import type { TextFieldBase } from "@material/mwc-textfield/mwc-textfield-base";

// https://github.com/home-assistant/frontend/blob/dev/src/components/ha-textfield.ts

type Events = {
  change: undefined;
};

type Properties = Overwrite<
  Partial<NonFunctionProperties<TextFieldBase>>,
  {
    invalid?: boolean;
    /* attribute: "error-message" */
    errorMessage?: string;
    icon?: boolean;
    iconTrailing?: boolean;
    autocomplete?: string;
    autocorrect?: string;
    /* attribute: "input-spellcheck" */
    inputSpellcheck?: string;
  } & ConvertEventsToProperties<Events>
>;

// eslint-disable-next-line @typescript-eslint/ban-types
type OtherProperties = {};

export type HaTextfieldLitElement = Overwrite<
  TextFieldBase,
  Properties & OtherProperties
>;

declare module "solid-js" {
  // eslint-disable-next-line @typescript-eslint/no-namespace -- overwriting existing declarations
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- we need to assign a lot of properties through prop:___
    interface ExplicitProperties extends Properties {
    }

    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- overwriting existing declarations
    interface IntrinsicElements {
      "ha-textfield": JSX.DOMAttributes<HaTextfieldLitElement> & Properties;
    }
  }
}
