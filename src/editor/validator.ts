import { safeParse, safeParseAsync } from "valibot";
import type { BaseSchema, BaseSchemaAsync } from "valibot";
import type { Validator } from "@tanstack/form-core";

export type ValidationResultSerialized = {
  message: string;
  path: string;
};

export const valibotValidator = (() => {
  return {
    validate({ value }, fn) {
      if (fn.async) return;
      const result = safeParse(fn, value);
      if (result.success) return;
      const serializedResults = result.issues.map<ValidationResultSerialized>((x) => ({
        message: x.message,
        path: x.path?.map((x) => x.key).join(".") ?? "",
      }));
      return JSON.stringify(serializedResults);
    },
    async validateAsync({ value }, fn) {
      const result = await safeParseAsync(fn, value);
      if (result.success) return;
      const serializedResults = result.issues.map<ValidationResultSerialized>((x) => ({
        message: x.message,
        path: x.path?.map((x) => x.key).join(".") ?? "",
      }));
      return JSON.stringify(serializedResults);
    },
  };
}) as Validator<unknown, BaseSchema | BaseSchemaAsync>;
