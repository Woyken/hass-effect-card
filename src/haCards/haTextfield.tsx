import { createComponent2 } from "../signal2";

export const HaTextfield = createComponent2<{
  invalid?: boolean;
  errorMessage?: string;
  icon?: boolean;
  iconTrailing?: boolean;
  autocomplete?: string;
  autocorrect?: string;
  inputSpellcheck?: string;

  label?: string;
  type?: string;
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
  min?: number;
  step?: number;
  value?: number;
  configValue?: string;
  onInput?: (e: InputEvent) => void;
}>((props) => {
  return (
    <ha-textfield
      prop:invalid={props.invalid()}
      prop:errorMessage={props.errorMessage()}
      prop:icon={props.icon()}
      prop:iconTrailing={props.iconTrailing()}
      prop:autocomplete={props.autocomplete()}
      prop:autocorrect={props.autocorrect()}
      prop:inputSpellcheck={props.inputSpellcheck()}
      prop:label={props.label()}
      // type={props.type}
      // inputMode={props.inputMode}
      prop:min={props.min()}
      prop:step={props.step()}
      // value={props.value}
      // configValue={props.configValue}

      onInput={props.onInput()}
    />
  );
});
