import Snowflakes from "magic-snowflakes";
import { JSX, children, createEffect, createMemo, onCleanup } from "solid-js";

export default function MagicSnowflakes(props: {
  container?: HTMLElement;
  count?: number;
  color?: string;
  minOpacity?: number;
  maxOpacity?: number;
  minSize?: number;
  maxSize?: number;
  rotation?: boolean;
  speed?: number;
  stop?: boolean;
  types?: number;
  width?: number;
  height?: number;
  wind?: boolean;
  zIndex?: number;
  autoResize?: boolean;
  children?: (instance: Snowflakes) => JSX.Element;
}) {
  const snowflakes = createMemo(() => {
    return new Snowflakes({
      container: props.container,
      count: props.count,
      color: props.color,
      minOpacity: props.minOpacity,
      maxOpacity: props.maxOpacity,
      minSize: props.minSize,
      maxSize: props.maxSize,
      rotation: props.rotation,
      speed: props.speed,
      stop: props.stop,
      types: props.types,
      width: props.width,
      height: props.height,
      wind: props.wind,
      zIndex: props.zIndex,
      autoResize: props.autoResize,
    });
  });
  createEffect(() => {
    const localSnowflakes = snowflakes();
    localSnowflakes.start();
    onCleanup(() => localSnowflakes.stop());
    onCleanup(() => localSnowflakes.destroy());
  });
  const c = children(() => props.children?.(snowflakes()));
  return <>{c()}</>;
}
