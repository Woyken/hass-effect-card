import { type Input, type Output, literal, object, unknown } from "valibot";

export const editorConfigSchema = object(
  { type: literal("custom:effect-card") },
  unknown()
);

export type EditorConfigSchemaIn = Input<typeof editorConfigSchema>;
export type EditorConfigSchema = Output<typeof editorConfigSchema>;
