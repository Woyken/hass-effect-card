import {
  object,
  type Output,
  variant,
  literal,
  optional,
  number,
  boolean,
  intersect,
  type Input,
  unknown,
  minValue,
  maxValue,
} from "valibot";

export const effectCardConfigSchema = intersect([
  object({ type: literal("custom:effect-card") }),
  variant(
    "effectType",
    [
      object({
        effectType: literal("magic-snowflakes"),
        colorRed: optional(number([minValue(0), maxValue(255)])),
        colorGreen: optional(number([minValue(0), maxValue(255)])),
        colorBlue: optional(number([minValue(0), maxValue(255)])),
        count: optional(number()),
        speed: optional(number()),
        minSize: optional(number()),
        maxSize: optional(number()),
        minOpacity: optional(number()),
        maxOpacity: optional(number()),
        wind: optional(boolean()),
        rotation: optional(boolean()),
        zIndex: optional(number()),
      }),
      object({
        effectType: literal("todo"),
        // entity: vstring("entity is required"),
      }),
    ],
    "effectType must be set (allowed values: 'magic-snowflakes')"
  ),
  unknown(),
]);
export type UserConfigSchemaIn = Input<typeof effectCardConfigSchema>;
export type UserConfigSchema = Output<typeof effectCardConfigSchema>;
