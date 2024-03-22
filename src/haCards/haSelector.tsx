import { type Selector } from "../haTypes/selector";

type Props = {
  name?: string;
  selector: Selector;
  value?: any;
  label?: string;
  helper?: string;
  localizeValue?: (key: string) => string;
  placeholder?: any;
  disabled?: boolean;
  required?: boolean;
  context?: Record<string, any>;
  onValueChanged?: (e: CustomEvent<{ value: string }>) => void;
};

export function HaSelector(props: Props) {
  return (
    <ha-selector
      prop:name={props.name}
      prop:selector={props.selector}
      prop:value={props.value}
      prop:label={props.label}
      prop:helper={props.helper}
      prop:localizeValue={props.localizeValue}
      prop:placeholder={props.placeholder}
      prop:disabled={props.disabled}
      prop:required={props.required}
      prop:context={props.context}
      // eslint-disable-next-line solid/reactivity -- just passing props directly
      onValue-changed={props.onValueChanged}
    />
  );
}

// https://github.com/home-assistant/frontend/blob/dev/src/components/ha-selector/ha-selector.ts
// import { SelectBase } from "@material/mwc-select/mwc-select-base";

declare module "solid-js" {
  // eslint-disable-next-line @typescript-eslint/no-namespace -- overwriting existing declarations
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- overwriting existing declarations
    interface IntrinsicElements {
      "ha-selector": any;
    }
  }
}
