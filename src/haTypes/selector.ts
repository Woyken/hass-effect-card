import type { HassServiceTarget } from "home-assistant-js-websocket";

type ToggleActionConfig = {
  action: "toggle";
} & BaseActionConfig;

type CallServiceActionConfig = {
  action: "call-service";
  service: string;
  target?: HassServiceTarget;
  // "service_data" is kept for backwards compatibility. Replaced by "data".
  service_data?: Record<string, unknown>;
  data?: Record<string, unknown>;
} & BaseActionConfig;

type NavigateActionConfig = {
  action: "navigate";
  navigation_path: string;
  navigation_replace?: boolean;
} & BaseActionConfig;

type UrlActionConfig = {
  action: "url";
  url_path: string;
} & BaseActionConfig;

type MoreInfoActionConfig = {
  action: "more-info";
} & BaseActionConfig;

type AssistActionConfig = {
  action: "assist";
  pipeline_id?: string;
  start_listening?: boolean;
} & BaseActionConfig;

type NoActionConfig = {
  action: "none";
} & BaseActionConfig;

type CustomActionConfig = {
  action: "fire-dom-event";
} & BaseActionConfig;

type BaseActionConfig = {
  action: string;
  confirmation?: ConfirmationRestrictionConfig;
};

type ConfirmationRestrictionConfig = {
  text?: string;
  exemptions?: RestrictionConfig[];
};

type RestrictionConfig = {
  user: string;
};

type ActionConfig =
  | ToggleActionConfig
  | CallServiceActionConfig
  | NavigateActionConfig
  | UrlActionConfig
  | MoreInfoActionConfig
  | AssistActionConfig
  | NoActionConfig
  | CustomActionConfig;

type UiAction = Exclude<ActionConfig["action"], "fire-dom-event">;
type ItemPath = Array<number | string>;

export type Selector =
  | ActionSelector
  | AddonSelector
  | AreaSelector
  | AreaFilterSelector
  | AttributeSelector
  | BooleanSelector
  | ColorRGBSelector
  | ColorTempSelector
  | ConditionSelector
  | ConversationAgentSelector
  | ConfigEntrySelector
  | ConstantSelector
  | CountrySelector
  | DateSelector
  | DateTimeSelector
  | DeviceSelector
  | LegacyDeviceSelector
  | DurationSelector
  | EntitySelector
  | LegacyEntitySelector
  | FileSelector
  | IconSelector
  | LanguageSelector
  | LocationSelector
  | MediaSelector
  | NavigationSelector
  | NumberSelector
  | ObjectSelector
  | AssistPipelineSelector
  | QRCodeSelector
  | SelectSelector
  | SelectorSelector
  | StateSelector
  | StatisticSelector
  | StringSelector
  | STTSelector
  | TargetSelector
  | TemplateSelector
  | ThemeSelector
  | TimeSelector
  | TriggerSelector
  | TTSSelector
  | TTSVoiceSelector
  | UiActionSelector
  | UiColorSelector;

type ActionSelector = {
  action: {
    path?: ItemPath;
  } | null;
};

type AddonSelector = {
  addon: {
    name?: string;
    slug?: string;
  } | null;
};

type AreaSelector = {
  area: {
    entity?: EntitySelectorFilter | readonly EntitySelectorFilter[];
    device?: DeviceSelectorFilter | readonly DeviceSelectorFilter[];
    multiple?: boolean;
  } | null;
};

type AreaFilterSelector = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  area_filter: {} | null;
};

type AttributeSelector = {
  attribute: {
    entity_id?: string;
    hide_attributes?: readonly string[];
  } | null;
};

type BooleanSelector = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  boolean: {} | null;
};

type ColorRGBSelector = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  color_rgb: {} | null;
};

type ColorTempSelector = {
  color_temp: {
    unit?: "kelvin" | "mired";
    min?: number;
    max?: number;
    min_mireds?: number;
    max_mireds?: number;
  } | null;
};

type ConditionSelector = {
  condition: {
    path?: ItemPath;
  } | null;
};

type ConversationAgentSelector = {
  conversation_agent: { language?: string } | null;
};

type ConfigEntrySelector = {
  config_entry: {
    integration?: string;
  } | null;
};

type ConstantSelector = {
  constant: {
    value: string | number | boolean;
    label?: string;
    translation_key?: string;
  } | null;
};

type CountrySelector = {
  country: {
    countries: string[];
    no_sort?: boolean;
  } | null;
};

type DateSelector = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  date: {} | null;
};

type DateTimeSelector = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  datetime: {} | null;
};

type DeviceSelectorFilter = {
  integration?: string;
  manufacturer?: string;
  model?: string;
};

type DeviceSelector = {
  device: {
    filter?: DeviceSelectorFilter | readonly DeviceSelectorFilter[];
    entity?: EntitySelectorFilter | readonly EntitySelectorFilter[];
    multiple?: boolean;
  } | null;
};

type LegacyDeviceSelector = {
  device: DeviceSelector["device"] & {
    /**
     * @deprecated Use filter instead
     */
    integration?: DeviceSelectorFilter["integration"];
    /**
     * @deprecated Use filter instead
     */
    manufacturer?: DeviceSelectorFilter["manufacturer"];
    /**
     * @deprecated Use filter instead
     */
    model?: DeviceSelectorFilter["model"];
  };
};

type DurationSelector = {
  duration: {
    enable_day?: boolean;
  } | null;
};

type EntitySelectorFilter = {
  integration?: string;
  domain?: string | readonly string[];
  device_class?: string | readonly string[];
  supported_features?: number | [number];
};

type EntitySelector = {
  entity: {
    multiple?: boolean;
    include_entities?: string[];
    exclude_entities?: string[];
    filter?: EntitySelectorFilter | readonly EntitySelectorFilter[];
  } | null;
};

type LegacyEntitySelector = {
  entity: EntitySelector["entity"] & {
    /**
     * @deprecated Use filter instead
     */
    integration?: EntitySelectorFilter["integration"];
    /**
     * @deprecated Use filter instead
     */
    domain?: EntitySelectorFilter["domain"];
    /**
     * @deprecated Use filter instead
     */
    device_class?: EntitySelectorFilter["device_class"];
  };
};

type StatisticSelector = {
  statistic: {
    device_class?: string;
    multiple?: boolean;
  };
};

type FileSelector = {
  file: {
    accept: string;
  } | null;
};

type IconSelector = {
  icon: {
    placeholder?: string;
    fallbackPath?: string;
  } | null;
};

type LanguageSelector = {
  language: {
    languages?: string[];
    native_name?: boolean;
    no_sort?: boolean;
  } | null;
};

type LocationSelector = {
  location: { radius?: boolean; icon?: string } | null;
};

type MediaSelector = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  media: {} | null;
};

type NavigationSelector = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  navigation: {} | null;
};

type NumberSelector = {
  number: {
    min?: number;
    max?: number;
    step?: number | "any";
    mode?: "box" | "slider";
    unit_of_measurement?: string;
  } | null;
};

type ObjectSelector = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  object: {} | null;
};

type AssistPipelineSelector = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  assist_pipeline: {
    include_last_used?: boolean;
  } | null;
};

type SelectOption = {
  value: any;
  label: string;
  disabled?: boolean;
};

type SelectSelector = {
  select: {
    multiple?: boolean;
    custom_value?: boolean;
    mode?: "list" | "dropdown";
    options: readonly string[] | readonly SelectOption[];
    translation_key?: string;
    sort?: boolean;
    reorder?: boolean;
  } | null;
};

type SelectorSelector = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  selector: {} | null;
};

type StateSelector = {
  state: {
    extra_options?: Array<{ label: string; value: any }>;
    entity_id?: string;
    attribute?: string;
  } | null;
};

type QRCodeSelector = {
  qr_code: {
    data: string;
    scale?: number;
    error_correction_level?: "low" | "medium" | "quartile" | "high";
    center_image?: string;
  } | null;
};

type StringSelector = {
  text: {
    multiline?: boolean;
    type?:
      | "number"
      | "text"
      | "search"
      | "tel"
      | "url"
      | "email"
      | "password"
      | "date"
      | "month"
      | "week"
      | "time"
      | "datetime-local"
      | "color";
    prefix?: string;
    suffix?: string;
    autocomplete?: string;
    multiple?: true;
  } | null;
};

type STTSelector = {
  stt: { language?: string } | null;
};

type TargetSelector = {
  target: {
    entity?: EntitySelectorFilter | readonly EntitySelectorFilter[];
    device?: DeviceSelectorFilter | readonly DeviceSelectorFilter[];
  } | null;
};

type TemplateSelector = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  template: {} | null;
};

type ThemeSelector = {
  theme: { include_default?: boolean } | null;
};
type TimeSelector = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  time: {} | null;
};

type TriggerSelector = {
  trigger: {
    path?: ItemPath;
  } | null;
};

type TTSSelector = {
  tts: { language?: string } | null;
};

type TTSVoiceSelector = {
  tts_voice: { engineId?: string; language?: string } | null;
};

type UiActionSelector = {
  ui_action: {
    actions?: UiAction[];
    default_action?: UiAction;
  } | null;
};

type UiColorSelector = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  ui_color: {} | null;
};
