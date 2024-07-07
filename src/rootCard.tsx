import { lazy } from "solid-js";
import { useCardConfig } from "./rootCardRenderer/useCardConfigContext";
import { Dynamic } from "solid-js/web";
import { createComponent2 } from "./signal2";

const LazySnow = lazy(
  async () => await import("./magicSnowflakes/magicSnowflakesCard")
);

const options = {
  "magic-snowflakes": LazySnow,
  todo: LazySnow,
};

export const RootCard = createComponent2(() => {
  const config = useCardConfig();

  return (
    <>
      <Dynamic component={options[config()?.effectType ?? "todo"]} />
    </>
  );
});
