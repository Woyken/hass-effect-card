import { useCardConfig } from "../rootCardRenderer/useCardConfigContext";
import { Show, createMemo } from "solid-js";
import MagicSnowflakes from "./magicSnowflakes";
import { useEditMode } from "../rootCardRenderer/useEditModeContext";
import { createComponent2, createSignal2 } from "../signal2";

const MagicSnowflakesCard = createComponent2(() => {
  const config = useCardConfig();
  const editMode = useEditMode();
  const snowflakeConfig = createMemo(() => {
    const cfg = config();
    if (cfg?.effectType === "magic-snowflakes") return cfg;
  });

  const formattedColor = createMemo(() => {
    const cfg = snowflakeConfig();
    if (!cfg) return undefined;
    const red = cfg.colorRed;
    const green = cfg.colorGreen;
    const blue = cfg.colorBlue;
    return red !== undefined || green !== undefined || blue !== undefined
      ? `#${(red ?? 0).toString(16).padStart(2, "0")}${(green ?? 0).toString(16).padStart(2, "0")}${(blue ?? 0).toString(16).padStart(2, "0")}`
      : undefined;
  });

  const container = createSignal2<HTMLElement>();

  return (
    <>
      <div style={{ height: "300px", width: "300px",position: 'absolute', overflow: 'hidden' }} ref={container.set} />
      <MagicSnowflakes
        count={snowflakeConfig()?.count}
        color={formattedColor()}
        minOpacity={snowflakeConfig()?.minOpacity}
        maxOpacity={snowflakeConfig()?.maxOpacity}
        minSize={snowflakeConfig()?.minSize}
        maxSize={snowflakeConfig()?.maxSize}
        rotation={snowflakeConfig()?.rotation}
        speed={snowflakeConfig()?.speed}
        wind={snowflakeConfig()?.wind}
        zIndex={snowflakeConfig()?.zIndex}
        container={container.get()}
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
            {String(formattedColor() ?? (instance as any).params?.color)}
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
});

export default MagicSnowflakesCard;
