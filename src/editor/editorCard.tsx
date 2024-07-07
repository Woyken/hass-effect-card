// import { HaSwitch } from "../haCards/haSwitch";
// import * as test from "https://raw.githubusercontent.com/home-assistant/frontend/dev/src/components/ha-textfield.ts";
// import { HaSelect } from "../haCards/haSelect";
// import { useCardConfigPublisher } from "../rootCardRenderer/useCardConfigPublisherContext";
// import { HaSelector } from "../haCards/haSelector";
// import { safeParse } from "valibot";
import { createEffect, createMemo } from "solid-js";
import {
  type UserConfigSchema,
  effectCardConfigSchema,
} from "../cardConfigSchema/cardConfigSchema";
import { createComponent2, createSignal2 } from "../signal2";
import { HaForm } from "../haCards/haForm";
import { type HaFormSchema } from "../haTypes/haSchema";
import { safeParse, flatten } from "valibot";
import { useEditorConfigPublisher } from "../rootCardRenderer/useCardConfigPublisherContext";
import { useEditorConfig } from "../rootCardRenderer/useEditorConfigContext";
import { type EditorConfigSchema } from "../cardConfigSchema/editorConfigSchema";

// function useFieldError<
//   TParentData,
//   TName extends DeepKeys<TParentData>,
//   TFieldValidator extends
//     | Validator<DeepValue<TParentData, TName>, unknown>
//     | undefined = undefined,
//   TFormValidator extends
//     | Validator<TParentData, unknown>
//     | undefined = undefined,
//   TData extends DeepValue<TParentData, TName> = DeepValue<TParentData, TName>,
// >(
//   field: Accessor<
//     FieldApi<TParentData, TName, TFieldValidator, TFormValidator, TData>
//   >
// ) {
//   const errors = field().form.useStore((s) => s.errors);
//   const error = createMemo(() =>
//     errors()
//       .flatMap((x) =>
//         typeof x === "string"
//           ? (JSON.parse(x) as ValidationResultSerialized[])
//           : undefined
//       )
//       .filter((x) => x?.path === field().name)
//       .map((x) => x?.message)
//       .join(", ")
//   );
//   return error;
// }
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

const effectTypeHaFormSchema: HaFormSchema[] = [
  {
    name: "effect_type",
    selector: {
      select: {
        mode: "dropdown",
        options: ["snowflakes", "TODO"].map((period) => ({
          value: period,
          label: `${period}`,
        })),
      },
    },
  },
];

const snowflakesHaFormSchema: HaFormSchema[] = [
  {
    name: "count",
    selector: {
      number: {
        min: 1,
        max: 200,
        mode: "slider",
        step: 1,
        unit_of_measurement: "snowflakes",
      },
    },
  },
  {
    name: "color_rgb",
    selector: { color_rgb: {} },
  },
  {
    name: "min_opacity",
    selector: {
      number: {
        min: 0,
        max: 1,
        mode: "slider",
        step: 0.1,
      },
    },
  },
  {
    name: "max_opacity",
    selector: {
      number: {
        min: 0,
        max: 1,
        mode: "slider",
        step: 0.1,
      },
    },
  },
  {
    name: "min_size",
    selector: {
      number: {
        min: 1,
        max: 200,
        mode: "slider",
        step: 1,
      },
    },
  },
  {
    name: "max_size",
    selector: {
      number: {
        min: 1,
        max: 200,
        mode: "slider",
        step: 1,
      },
    },
  },
  {
    name: "rotation",
    selector: {
      boolean: {},
    },
  },
  {
    name: "speed",
    selector: {
      number: {
        min: 0.1,
        max: 10,
        mode: "slider",
        step: 0.1,
      },
    },
  },
  {
    name: "wind",
    selector: {
      boolean: {},
    },
  },
  {
    name: "",
    type: "grid",
    schema: [
      {
        name: "z_index",
        selector: {
          number: {
            min: 1,
            max: 9999,
            mode: "box",
            step: 1,
          },
        },
      },
    ],
  },
];

function convertInputToConfig(data: unknown) {
  const res = {
    type: "custom:effect-card",
    effectType: "magic-snowflakes",
  } as const;

  if (typeof data === "object" && data) {
    const dataObj = data;
    const res1 = {
      ...res,
      colorRed:
        "color_rgb" in dataObj &&
        Array.isArray(dataObj.color_rgb) &&
        dataObj.color_rgb?.[0],
      colorGreen:
        "color_rgb" in dataObj &&
        Array.isArray(dataObj.color_rgb) &&
        dataObj.color_rgb?.[1],
      colorBlue:
        "color_rgb" in dataObj &&
        Array.isArray(dataObj.color_rgb) &&
        dataObj.color_rgb?.[2],
      count: "count" in dataObj && dataObj.count,
      maxOpacity: "max_opacity" in dataObj && dataObj.max_opacity,
      maxSize: "max_size" in dataObj && dataObj.max_size,
      minOpacity: "min_opacity" in dataObj && dataObj.min_opacity,
      minSize: "min_size" in dataObj && dataObj.min_size,
      rotation: "rotation" in dataObj && dataObj.rotation,
      speed: "speed" in dataObj && dataObj.speed,
      wind: "wind" in dataObj && dataObj.wind,
      zIndex: "z_index" in dataObj && dataObj.z_index,
    } as const;
    return res1;
  }
  return res;
}

function convertConfigToInput(cfg: EditorConfigSchema) {
  const res = {
    type: "custom:effect-card",
    effectType: "magic-snowflakes",
    color_rgb: [cfg.colorRed, cfg.colorGreen, cfg.colorBlue],
    count: cfg.count,
    max_opacity: cfg.maxOpacity,
    max_size: cfg.maxSize,
    min_opacity: cfg.minOpacity,
    min_size: cfg.minSize,
    rotation: cfg.rotation,
    speed: cfg.speed,
    wind: cfg.wind,
    z_index: cfg.zIndex,
  };
  return res;
}

export const EditorCard = createComponent2(() => {
  const cfg = useEditorConfig();
  const publishConfig = useEditorConfigPublisher();

  const snowflakeConfig = createMemo(() => {
    const config = cfg();
    if (config?.effectType === "magic-snowflakes") return config;
    // return config
  });

  // TODO, currently this package has no way to differentiate errors from full schema to "schema.prop"
  // No way figure out if error happened on some global property or on "color".
  // Unless provided <Field validator... ><inputColor>
  // that's not ideal. Can we parse some partial schema?
  // Or custom validator, encoding property in error string

  // Probably as the component is being unloaded all the fields are removed one by one and formValues is updated.
  // TODO do not emit while unloading
  // TODO, nope onCleanup is not triggered

  // TODO do not emit when invalid. If parsed invalid config, UI editor will be disabled.

  // let isUnloading = false;
  // onCleanup(() => (isUnloading = true));

  // const form = createForm(() => ({
  //   // We need new instance, because it just modifies whatever we pass here
  //   defaultValues: JSON.parse(JSON.stringify(snowflakeConfig())) as ReturnType<
  //     typeof snowflakeConfig
  //   >,
  //   validatorAdapter: valibotValidator,
  //   validators: {
  //     onChange: effectCardConfigSchema,
  //   },
  // }));

  // const f = form.useStore((x) => ({
  //   isValid:
  //     x.isFieldsValid &&
  //     x.isValid &&
  //     x.isFieldsValid &&
  //     !x.isValidating &&
  //     !x.isFormValidating &&
  //     !x.isFieldsValidating &&
  //     x.canSubmit,
  //   values: x.values,
  // }));

  // const isValid = () => f().isValid;
  // const formValues = () => f().values;

  createEffect(() => {
    console.log("cfgChanged!", snowflakeConfig());
  });

  // createEffect(() => {
  //   console.log("formValues changed!", JSON.stringify(formValues()));
  // });

  // createEffect(() => {
  //   batch(() => {
  //     console.log(
  //       "JSON.stringify(cfg()) !== JSON.stringify(formValues())",
  //       JSON.stringify(snowflakeConfig()),
  //       JSON.stringify(formValues()),
  //       JSON.stringify(snowflakeConfig()) !== JSON.stringify(formValues()),
  //       isUnloading,
  //       isValid()
  //     );
  //     if (
  //       JSON.stringify(snowflakeConfig()) !== JSON.stringify(formValues()) &&
  //       !isUnloading &&
  //       isValid()
  //     ) {
  //       console.warn(
  //         "publishing config!",
  //         JSON.parse(JSON.stringify(formValues()))
  //       );
  //       publishConfig(JSON.parse(JSON.stringify(formValues())));
  //     }
  //   });
  // });

  const inputData = createSignal2(
    convertConfigToInput(
      // eslint-disable-next-line solid/reactivity -- used for initial state
      snowflakeConfig() ?? {
        type: "custom:effect-card",
        effectType: "magic-snowflakes",
      }
    )
  );

  const convertedInputData = createMemo(() => {
    return convertInputToConfig(inputData.get());
  });

  createEffect(() => {
    publishConfig(convertedInputData());
  });

  const parsedInputResult = createMemo(() => {
    return safeParse(effectCardConfigSchema, convertedInputData());
  });

  const flattenedErrors = createMemo(() => {
    const parsedResult = parsedInputResult();
    return !parsedResult.success
      ? flatten(parsedResult.issues).nested
      : undefined;
  });

  const errorsForForm = createMemo(() => {
    const flatErrors = flattenedErrors();
    if (!flatErrors) return;
    return Object.keys(flatErrors).reduce<Record<string, string>>(
      (acc, curr) => {
        const errorsForField = flatErrors[curr];
        if (errorsForField) acc[curr] = errorsForField.join(", ");
        return acc;
      },
      {}
    );
  });

  createEffect(() => {
    const parsedResult = parsedInputResult();
    console.log("parsedResult", parsedResult);
    console.log(
      "flatten",
      !parsedResult.success ? flatten(parsedResult.issues).nested : undefined
    );
  });

  // todo other configs, like color, probably text input is fine for it

  const haFormSchema = createMemo<HaFormSchema[]>(() => {
    if (cfg()?.effectType === "magic-snowflakes") {
      return [...effectTypeHaFormSchema, ...snowflakesHaFormSchema];
    }
    return [...effectTypeHaFormSchema];
  });

  return (
    <HaForm
      data={inputData.get()}
      computeLabel={(x) => x.name + " a"}
      schema={haFormSchema()}
      onValueChanged={(x) => {
        inputData.set(x);
        // console.log(x, convertInputToConfig(x));
        // publishConfig(convertInputToConfig(x));
      }}
      error={errorsForForm()}
    />
    // <>
    //   <form.Field name="effectType">
    //     {(field) => {
    //       const error = useFieldError(field);
    //       return (
    //         <HaSelector
    //           selector={{
    //             select: {
    //               options: [
    //                 { label: "Magic Snowflakes", value: "magic-snowflakes" },
    //               ],
    //               mode: "dropdown",
    //               multiple: false,
    //               custom_value: false,
    //             },
    //           }}
    //           helper={error()}
    //           value={field().state.value}
    //           label="Effect type"
    //           // helper={field().state.meta.isPristine}
    //           onValueChanged={(e) => {
    //             console.log("Field effectType changed", e.detail.value);
    //             // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- validate the input
    //             field().handleChange(e.detail.value as any);
    //             // field().form.setFieldValue("color", e.detail.value as any, {touch: true})
    //           }}
    //         />
    //       );
    //     }}
    //   </form.Field>
    //   {/* <HaSwitch onChecked={console.warn} /> */}
    //   <form.Field name="color" defaultMeta={{ isTouched: true }}>
    //     {(field) => {
    //       const error = useFieldError(field);
    //       return (
    //         <HaTextfield
    //           invalid={!!error()}
    //           errorMessage={error()}
    //           value={field().state.value as any}
    //           onInput={(e) => {
    //             console.log("Field color changed", (e.target as any)?.value);
    //             field().handleChange((e.target as any)?.value);
    //           }}
    //           icon
    //           inputSpellcheck="what?"
    //         />
    //       );
    //     }}
    //   </form.Field>
    //   <form.Field name="count">
    //     {(field) => {
    //       const error = useFieldError(field);
    //       return (
    //         <HaLabeledSlider
    //           helper={error()}
    //           onValueChanged={(e) => {
    //             field().handleChange(e);
    //           }}
    //           value={field().state.value as any}
    //         />
    //       );
    //     }}
    //   </form.Field>
    // </>
  );
});
