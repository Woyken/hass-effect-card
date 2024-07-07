import { type HaFormData, type HaFormSchema } from "../haTypes/haSchema";
import { useHass } from "../rootCardRenderer/useHassContext";
import { createComponent2 } from "../signal2";

type Props = {
  data: any;
  schema?: HaFormSchema[];
  error?: Record<string, string | string[]>;
  warning?: Record<string, string>;
  disabled?: boolean;
  computeError?: (schema: any, error: any) => string;
  computeWarning?: (schema: any, warning: any) => string;
  computeLabel?: (schema: any, data: Record<string, HaFormData>) => string;
  computeHelper?: (schema: any) => string | undefined;
  localizeValue?: (key: string) => string;

  onValueChanged: (data: any) => void;
};

export const HaForm = createComponent2<Props>((props) => {
  const hass = useHass();
  return (
    <ha-form
      prop:hass={hass()}
      prop:data={props.data()}
      prop:schema={props.schema()}
      prop:error={props.error()}
      prop:warning={props.warning()}
      prop:disabled={props.disabled()}
      prop:computeError={props.computeError()}
      prop:computeWarning={props.computeWarning()}
      prop:computeLabel={props.computeLabel()}
      prop:computeHelper={props.computeHelper()}
      prop:localizeValue={props.localizeValue()}
      onValue-changed={(e: CustomEvent<{ value: any }>) => {
        props.onValueChanged()(e.detail.value);
      }}
    />
  );
});

// https://github.com/home-assistant/frontend/blob/dev/src/components/ha-form/ha-form.ts

declare module "solid-js" {
  // eslint-disable-next-line @typescript-eslint/no-namespace -- overwriting existing declarations
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- overwriting existing declarations
    interface IntrinsicElements {
      "ha-form": any;
    }
  }
}
