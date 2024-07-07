import { createComponent2 } from "../signal2";

type Props = {
  icon: boolean;
  clearable: boolean;

  disabled: boolean;
  outlined: boolean;
  label: string;
  value: string;
  name: string;
  // icon: string;
  helper: string;
  validateOnInitialRender: boolean;
  validationMessage: string;
  required: boolean;
  naturalMenuWidth: boolean;
  fixedMenuPosition: boolean;
  onSelected: (item: string) => void;
};

export const HaSelect = createComponent2<Props>((props) => {
  return (
    <ha-select
      prop:icon={props.icon()}
      prop:clearable={props.clearable()}
      prop:disabled={props.disabled()}
      prop:outlined={props.outlined()}
      prop:label={props.label()}
      prop:value={props.value()}
      prop:name={props.name()}
      prop:helper={props.helper()}
      prop:validateOnInitialRender={props.validateOnInitialRender()}
      prop:validationMessage={props.validationMessage()}
      prop:required={props.required()}
      prop:naturalMenuWidth={props.naturalMenuWidth()}
      prop:fixedMenuPosition={props.fixedMenuPosition()}
      onSelected={(e: any) => {
        const selectedItem: string = e.target.value;
        props.onSelected()(selectedItem);
      }}
    />
  );
});

// https://github.com/home-assistant/frontend/blob/dev/src/components/ha-select.ts
// import { SelectBase } from "@material/mwc-select/mwc-select-base";

declare module "solid-js" {
  // eslint-disable-next-line @typescript-eslint/no-namespace -- overwriting existing declarations
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- overwriting existing declarations
    interface IntrinsicElements {
      "ha-select": any;
    }
  }
}
