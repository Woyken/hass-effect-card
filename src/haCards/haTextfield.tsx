export function HaTextfield(props: {
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
}) {
  return (
    <ha-textfield
      prop:invalid={props.invalid}
      prop:errorMessage={props.errorMessage}
      prop:icon={props.icon}
      prop:iconTrailing={props.iconTrailing}
      prop:autocomplete={props.autocomplete}
      prop:autocorrect={props.autocorrect}
      prop:inputSpellcheck={props.inputSpellcheck}

      prop:label={props.label}
      // type={props.type}
      // inputMode={props.inputMode}
      prop:min={props.min}
      prop:step={props.step}
      // value={props.value}
      // configValue={props.configValue}

      onInput={props.onInput}
    />
  );
}
