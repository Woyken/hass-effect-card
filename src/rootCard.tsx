import { lazy } from "solid-js";
import { useCardConfig } from "./rootCardRenderer/useCardConfigContext";
import { Dynamic } from "solid-js/web";

const LazySnow = lazy(
  async () => await import("./magicSnowflakes/magicSnowflakesCard")
);

const options = {
  "magic-snowflakes": LazySnow,
  todo: LazySnow,
};

export function RootCard() {
  const config = useCardConfig();

  return (
    <>
      <Dynamic component={options[config()?.effectType ?? "todo"]} />
    </>
  );
}
