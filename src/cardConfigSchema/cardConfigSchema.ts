import {
  object,
  type Output,
  variant,
  literal,
  string,
  optional,
  number,
  boolean,
  intersect,
  type Input,
  length,
  transform,
} from "valibot";

export const effectCardConfigSchema = intersect([
  object({ type: literal("custom:effect-card") }),
  variant(
    "effectType",
    [
      object({
        effectType: literal("magic-snowflakes"),
        color: transform(optional(string([length(2, "aaaaaaaaaaa")])), (i) => {
          console.log("transform color", i);
          return i;
        }),
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
]);
export type UserConfigSchemaIn = Input<typeof effectCardConfigSchema>;
export type UserConfigSchema = Output<typeof effectCardConfigSchema>;
