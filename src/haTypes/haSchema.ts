import type { LitElement } from "lit";
import { type Selector } from "./selector";

type HaDurationData = {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
  }

export type HaFormSchema =
  | HaFormConstantSchema
  | HaFormStringSchema
  | HaFormIntegerSchema
  | HaFormFloatSchema
  | HaFormBooleanSchema
  | HaFormSelectSchema
  | HaFormMultiSelectSchema
  | HaFormTimeSchema
  | HaFormSelector
  | HaFormGridSchema
  | HaFormExpandableSchema;

type HaFormBaseSchema = {
  name: string;
  // This value is applied if no data is submitted for this field
  default?: HaFormData;
  required?: boolean;
  disabled?: boolean;
  description?: {
    suffix?: string;
    // This value will be set initially when form is loaded
    suggested_value?: HaFormData;
  };
  context?: Record<string, string>;
};

type HaFormGridSchema = {
  type: "grid";
  name: string;
  column_min_width?: string;
  schema: readonly HaFormSchema[];
} & HaFormBaseSchema;

type HaFormExpandableSchema = {
  type: "expandable";
  name: "";
  title: string;
  icon?: string;
  iconPath?: string;
  expanded?: boolean;
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  schema: readonly HaFormSchema[];
} & HaFormBaseSchema;

type HaFormSelector = {
  type?: never;
  selector: Selector;
} & HaFormBaseSchema;

type HaFormConstantSchema = {
  type: "constant";
  value?: string;
} & HaFormBaseSchema;

type HaFormIntegerSchema = {
  type: "integer";
  default?: HaFormIntegerData;
  valueMin?: number;
  valueMax?: number;
} & HaFormBaseSchema;

type HaFormSelectSchema = {
  type: "select";
  options: ReadonlyArray<readonly [string, string]>;
} & HaFormBaseSchema;

type HaFormMultiSelectSchema = {
  type: "multi_select";
  options:
    | Record<string, string>
    | readonly string[]
    | ReadonlyArray<readonly [string, string]>;
} & HaFormBaseSchema;

type HaFormFloatSchema = {
  type: "float";
} & HaFormBaseSchema;

type HaFormStringSchema = {
  type: "string";
  format?: string;
  autocomplete?: string;
} & HaFormBaseSchema;

type HaFormBooleanSchema = {
  type: "boolean";
} & HaFormBaseSchema;

type HaFormTimeSchema = {
  type: "positive_time_period_dict";
} & HaFormBaseSchema;

// Type utility to unionize a schema array by flattening any grid schemas
export type SchemaUnion<
  SchemaArray extends readonly HaFormSchema[],
  Schema = SchemaArray[number],
> = Schema extends HaFormGridSchema | HaFormExpandableSchema
  ? SchemaUnion<Schema["schema"]>
  : Schema;

type HaFormDataContainer = Record<string, HaFormData>;

export type HaFormData =
  | HaFormStringData
  | HaFormIntegerData
  | HaFormFloatData
  | HaFormBooleanData
  | HaFormSelectData
  | HaFormMultiSelectData
  | HaFormTimeData;

type HaFormStringData = string;
type HaFormIntegerData = number;
type HaFormFloatData = number;
type HaFormBooleanData = boolean;
type HaFormSelectData = string;
type HaFormMultiSelectData = string[];
type HaFormTimeData = HaDurationData;

export type HaFormElement = {
  schema: HaFormSchema | readonly HaFormSchema[];
  data?: HaFormDataContainer | HaFormData;
  label?: string;
} & LitElement;
