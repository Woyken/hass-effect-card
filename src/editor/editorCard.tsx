// import { createEffect, createMemo, createSignal } from "solid-js";
import { HaTextfield } from "../haCards/haTextfield";
// import { HaSwitch } from "../haCards/haSwitch";
// import * as test from "https://raw.githubusercontent.com/home-assistant/frontend/dev/src/components/ha-textfield.ts";
// import { HaSelect } from "../haCards/haSelect";
import { useCardConfig } from "../rootCardRenderer/useCardConfigContext";
// import { useCardConfigPublisher } from "../rootCardRenderer/useCardConfigPublisherContext";
import { HaSelector } from "../haCards/haSelector";
// import { safeParse } from "valibot";
import { createForm } from "@tanstack/solid-form";
import { createEffect } from "solid-js";
import { effectCardConfigSchema } from "../cardConfigSchema/cardConfigSchema";
import { valibotValidator } from "./validator";

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

  const errors = form.useStore((s) => s.errors);
  // const colorErrors = form.useStore((s) => s.fieldMeta.color?.errors);
  const store = form.useStore((s) => s);
  createEffect(() => {
    console.log("errors", errors().join(","));
  });
  createEffect(() => {
    console.log("store", store());
  });

  createEffect(() => {
    console.log("form.state.errors", form.state.errors);
  });
  createEffect(() => {
    console.log("form.state.isFormValid", form.state.isFormValid);
  });
  createEffect(() => {
    console.log("form.state.values", form.state.values);
  });

  // const localCardConfig = createMemo(() => {
  //   const currentConfig = cfg();
  //   const selectedEffect = selectedEffectType();
  //   if (!currentConfig) return;
  //   const newResult = { ...currentConfig, effectType: selectedEffect };
  //   const parsedLocalConfig = safeParse(userConfigSchema, newResult);
  //   return parsedLocalConfig;
  // });

  // createEffect(() => {
  //   const localConfig = localCardConfig();
  //   const currentConfig = cfg();
  //   if (
  //     currentConfig &&
  //     localConfig &&
  //     JSON.stringify(currentConfig) !== JSON.stringify(localConfig.output)
  //   ) {
  //     if (localConfig.success) publishConfig(localConfig.output);
  //   }
  // });

  // todo other configs, like color, probably text input is fine for it

  return (
    <>
      <form.Field name="effectType">
        {(field) => (
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
            value={field().state.value}
            label="Effect type"
            // helper={field().state.meta.isPristine}
            onValueChanged={(e) => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- validate the input
              field().handleChange(e.detail.value as any);
              // field().form.setFieldValue("color", e.detail.value as any, {touch: true})
            }}
          />
        )}
      </form.Field>
      {/* <HaSwitch onChecked={console.warn} /> */}
      <form.Field name="color" defaultMeta={{ isTouched: true }}>
        {(field) => {
          return (
            <>
              <button
                onClick={() => {
                  void field().form.validate("change");
                }}
              />
              <HaTextfield
                invalid={field().getMeta().errors.length > 0}
                errorMessage={field().state.meta.errors.join(", ")}
                onInput={(e) => {
                  field().handleChange((e.target as any)?.value);
                }}
                icon
                inputSpellcheck="what?"
              />
            </>
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
