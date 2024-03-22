import { createEffect, createSignal } from "solid-js";
import { type HaComboBoxLitElement } from "../homeassistant-web-components/haComboBox";

export function HaComboBox<
  ItemType = {
    label: string;
    value: string;
  },
>(props: {
  label?: string;
  value?: string;
  placeholder?: string;
  validationMessage?: string;
  helper?: string;
  errorMessage?: string;
  invalid?: boolean;
  icon?: boolean;
  allowCustomValue?: boolean;
  disabled?: boolean;
  required?: boolean;
  opened?: boolean;

  focus?: boolean;
  onValueChanged?: HaComboBoxLitElement["onValue-changed"];
  onFilterChanged?: HaComboBoxLitElement["onFilter-changed"];
  onOpenedChanged?: HaComboBoxLitElement["onOpened-changed"];
  items?: ItemType[];
}) {
  const [ref, setRef] = createSignal<HaComboBoxLitElement>();

  createEffect(() => {
    if (props.opened) void ref()?.open();
  });

  createEffect(() => {
    // this doesn't seem to work...
    // combobox.value gets set, ant it doesn't update the component?
    // Or is there a bug and input element needs to be set?
    // ref()?.setInputValue(props.value ?? "");
  });

  createEffect(() => {
    if (props.focus) void ref()?.focus();
  });

  return (
    <ha-combo-box
      ref={setRef}

      prop:label={props.label}
      prop:value={props.value}
      prop:placeholder={props.placeholder}
      prop:validationMessage={props.validationMessage}
      prop:helper={props.helper}
      prop:errorMessage={props.errorMessage}
      prop:invalid={props.invalid}
      prop:icon={props.icon}
      prop:allowCustomValue={props.allowCustomValue}
      // itemValuePath={props.itemValuePath} leave default
      // itemLabelPath={props.itemLabelPath} leave default
      // itemIdPath={props.itemIdPath} leave default
      prop:disabled={props.disabled}
      prop:required={props.required}
      // opened={props.opened} This doesn't do much, only switches the arrow
      prop:items={props.items}

      // eslint-disable-next-line solid/reactivity -- just passing props directly
      onValue-changed={props.onValueChanged}
      // eslint-disable-next-line solid/reactivity -- just passing props directly
      onFilter-changed={props.onFilterChanged}
      // eslint-disable-next-line solid/reactivity -- just passing props directly
      onOpened-changed={props.onOpenedChanged}
    />
  );
}
