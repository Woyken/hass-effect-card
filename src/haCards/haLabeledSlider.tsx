import { createComponent2 } from "../signal2";

type Props = {
  labeled?: boolean;
  caption?: string;
  disabled?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  helper?: string;
  extra?: boolean;
  icon?: string;
  value?: number;
  onValueChanged: (item: number) => void;
};

export const HaLabeledSlider = createComponent2<Props>((props) => {
  return (
    <ha-slider
      prop:labeled={props.labeled()}
      prop:caption={props.caption()}
      prop:disabled={props.disabled()}
      prop:required={props.required()}
      prop:min={props.min()}
      prop:max={props.max()}
      prop:step={props.step()}
      prop:helper={props.helper()}
      prop:extra={props.extra()}
      prop:icon={props.icon()}
      prop:value={props.value()}
      onValue-changed={(e: any) => {
        const selectedItem: number = e.target.value;
        props.onValueChanged()(selectedItem);
      }}
    />
  );
});

// https://github.com/home-assistant/frontend/blob/dev/src/components/ha-labeled-slider.ts
// import { SelectBase } from "@material/mwc-select/mwc-select-base";

declare module "solid-js" {
  // eslint-disable-next-line @typescript-eslint/no-namespace -- overwriting existing declarations
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- overwriting existing declarations
    interface IntrinsicElements {
      "ha-slider": any;
    }
  }
}
