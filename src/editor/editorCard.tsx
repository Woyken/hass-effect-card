// import { createEffect, createMemo, createSignal } from "solid-js";
import { HaTextfield } from "../haCards/haTextfield";
// import { HaSwitch } from "../haCards/haSwitch";
// import * as test from "https://raw.githubusercontent.com/home-assistant/frontend/dev/src/components/ha-textfield.ts";
// import { HaSelect } from "../haCards/haSelect";
import { useCardConfig } from "../rootCardRenderer/useCardConfigContext";
// import { useCardConfigPublisher } from "../rootCardRenderer/useCardConfigPublisherContext";
import { HaSelector } from "../haCards/haSelector";
// import { safeParse } from "valibot";
import {
  type FieldApi,
  createForm,
  type DeepKeys,
  type DeepValue,
} from "@tanstack/solid-form";
import { type Accessor, createMemo } from "solid-js";
import { effectCardConfigSchema } from "../cardConfigSchema/cardConfigSchema";
import { type ValidationResultSerialized, valibotValidator } from "./validator";
import { type Validator } from "@tanstack/form-core";

function useFieldError<
  TParentData,
  TName extends DeepKeys<TParentData>,
  TFieldValidator extends
    | Validator<DeepValue<TParentData, TName>, unknown>
    | undefined = undefined,
  TFormValidator extends
    | Validator<TParentData, unknown>
    | undefined = undefined,
  TData extends DeepValue<TParentData, TName> = DeepValue<TParentData, TName>,
>(
  field: Accessor<
    FieldApi<TParentData, TName, TFieldValidator, TFormValidator, TData>
  >
) {
  const errors = field().form.useStore((s) => s.errors);
  const error = createMemo(() =>
    errors()
      .flatMap((x) =>
        typeof x === "string"
          ? (JSON.parse(x) as ValidationResultSerialized[])
          : undefined
      )
      .filter((x) => x?.path === field().name)
      .map((x) => x?.message)
      .join(", ")
  );
  return error;
}

export function EditorCard() {
  const cfg = useCardConfig();
  // const publishConfig = useCardConfigPublisher();

  // TODO, currently this package has no way to differentiate errors from full schema to "schema.prop"
  // No way figure out if error happened on some global property or on "color".
  // Unless provided <Field validator... ><inputColor>
  // that's not ideal. Can we parse some partial schema?
  // Or custom validator, encoding property in error string
  const form = createForm(() => ({
    defaultValues: cfg(),
    validatorAdapter: valibotValidator,
    validators: {
      onChange: effectCardConfigSchema,
    },
  }));

  // todo other configs, like color, probably text input is fine for it

  return (
    <>
      <form.Field name="effectType">
        {(field) => {
          const error = useFieldError(field);
          return (
            <HaSelector
              selector={{
                select: {
                  options: [
                    { label: "Magic Snowflakes", value: "magic-snowflakes" },
                  ],
                  mode: "dropdown",
                  multiple: false,
                  custom_value: false,
                },
              }}
              helper={error()}
              value={field().state.value}
              label="Effect type"
              // helper={field().state.meta.isPristine}
              onValueChanged={(e) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- validate the input
                field().handleChange(e.detail.value as any);
                // field().form.setFieldValue("color", e.detail.value as any, {touch: true})
              }}
            />
          );
        }}
      </form.Field>
      {/* <HaSwitch onChecked={console.warn} /> */}
      <form.Field name="color" defaultMeta={{ isTouched: true }}>
        {(field) => {
          const error = useFieldError(field);
          return (
            <HaTextfield
              invalid={!!error()}
              errorMessage={error()}
              onInput={(e) => {
                field().handleChange((e.target as any)?.value);
              }}
              icon
              inputSpellcheck="what?"
            />
          );
        }}
      </form.Field>
    </>
  );
}
/*
effectType=
count=50
color=#5ECDEF
minOpacity=0.6
maxOpacity=1
minSize=10
maxSize=25
rotation=true
speed=1
wind=true
zIndex=9999
*/
