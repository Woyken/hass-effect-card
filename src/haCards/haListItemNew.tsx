// https://github.com/home-assistant/frontend/blob/dev/src/components/ha-list-item-new.ts
// import { MdListItem } from "@material/web/list/list-item";

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
}

export function HaSelect(props: Props) {
  return (
    <ha-list-item-new
      prop:icon={props.icon}
      prop:clearable={props.clearable}

      prop:disabled={props.disabled}
      prop:outlined={props.outlined}
      prop:label={props.label}
      prop:value={props.value}
      prop:name={props.name}
      prop:helper={props.helper}
      prop:validateOnInitialRender={props.validateOnInitialRender}
      prop:validationMessage={props.validationMessage}
      prop:required={props.required}
      prop:naturalMenuWidth={props.naturalMenuWidth}
      prop:fixedMenuPosition={props.fixedMenuPosition}
      onSelected={(e: any) => {
        const selectedItem: string = e.target.value;
        props.onSelected(selectedItem);
      }}
    />
  );
}

declare module "solid-js" {
  // eslint-disable-next-line @typescript-eslint/no-namespace -- overwriting existing declarations
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- overwriting existing declarations
    interface IntrinsicElements {
      "ha-list-item-new": any;
    }
  }
}
