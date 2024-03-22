import { type SwitchBase } from "@material/mwc-switch/deprecated/mwc-switch-base";

// https://github.com/home-assistant/frontend/blob/dev/src/components/ha-switch.ts

type Events = {
  // change: Event & { target: HTMLInputElement };
};

type Properties = Overwrite<
  Partial<NonFunctionProperties<SwitchBase>>,
  {
    haptic?: boolean;
  } & ConvertEventsToProperties<Events>
>;

// eslint-disable-next-line @typescript-eslint/ban-types
type OtherProperties = {};

export type HaSwitchLitElement = Overwrite<
  SwitchBase,
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
      "ha-switch": JSX.DOMAttributes<HaSwitchLitElement> & Properties;
      // "test": HTMLElementTagNameMap['ha-switch']
    }
  }
}
