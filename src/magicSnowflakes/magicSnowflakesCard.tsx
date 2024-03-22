import { useCardConfig } from "../rootCardRenderer/useCardConfigContext";
import { Show, createMemo } from "solid-js";
import MagicSnowflakes from "./magicSnowflakes";
import { useEditMode } from "../rootCardRenderer/useEditModeContext";

export default function MagicSnowflakesCard() {
  const config = useCardConfig();
  const editMode = useEditMode();
  const snowflakeConfig = createMemo(() => {
    const cfg = config();
    if (cfg?.effectType === "magic-snowflakes") return cfg;
  });

  return (
    <>
      <MagicSnowflakes
        count={snowflakeConfig()?.count}
        color={snowflakeConfig()?.color}
        minOpacity={snowflakeConfig()?.minOpacity}
        maxOpacity={snowflakeConfig()?.maxOpacity}
        minSize={snowflakeConfig()?.minSize}
        maxSize={snowflakeConfig()?.maxSize}
        rotation={snowflakeConfig()?.rotation}
        speed={snowflakeConfig()?.speed}
        wind={snowflakeConfig()?.wind}
        zIndex={snowflakeConfig()?.zIndex}
      >
        {(instance) => (
          <Show when={editMode()}>
            effectType={snowflakeConfig()?.effectType}
            <br />
            count=
            {String(
              snowflakeConfig()?.count ?? (instance as any).params?.count
            )}
            <br />
            color=
            {String(
              snowflakeConfig()?.color ?? (instance as any).params?.color
            )}
            <br />
            minOpacity=
            {String(
              snowflakeConfig()?.minOpacity ??
                (instance as any).params?.minOpacity
            )}
            <br />
            maxOpacity=
            {String(
              snowflakeConfig()?.maxOpacity ??
                (instance as any).params?.maxOpacity
            )}
            <br />
            minSize=
            {String(
              snowflakeConfig()?.minSize ?? (instance as any).params?.minSize
            )}
            <br />
            maxSize=
            {String(
              snowflakeConfig()?.maxSize ?? (instance as any).params?.maxSize
            )}
            <br />
            rotation=
            {String(
              snowflakeConfig()?.rotation ?? (instance as any).params?.rotation
            )}
            <br />
            speed=
            {String(
              snowflakeConfig()?.speed ?? (instance as any).params?.speed
            )}
            <br />
            wind=
            {String(snowflakeConfig()?.wind ?? (instance as any).params?.wind)}
            <br />
            zIndex=
            {String(
              snowflakeConfig()?.zIndex ?? (instance as any).params?.zIndex
            )}
          </Show>
        )}
      </MagicSnowflakes>
    </>
  );
}
