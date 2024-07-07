import Snowflakes from "magic-snowflakes";
import {
  type JSX,
  children,
  createEffect,
  createMemo,
  onCleanup,
  Show,
} from "solid-js";
import { createComponent2, createSignal2 } from "../signal2";

const mainSnowflakeStyle = createSignal2<string>();

const MagicSnowflakes = createComponent2<{
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
}>((props) => {
  const stylesContainers = createSignal2<HTMLStyleElement[]>([]);
  const snowflakes = createMemo(() => {
    const originalAppendStylesFn: Function = (Snowflakes as any).prototype
      .appendStyles;
    // It's called directly in constructor, override temporarily
    (Snowflakes as any).prototype.appendStyles = () => {};
    const snowflakes = new Snowflakes({
      container: props.container(),
      count: props.count(),
      color: props.color(),
      minOpacity: props.minOpacity(),
      maxOpacity: props.maxOpacity(),
      minSize: props.minSize(),
      maxSize: props.maxSize(),
      rotation: props.rotation(),
      speed: props.speed(),
      stop: props.stop(),
      types: props.types(),
      width: props.width(),
      height: props.height(),
      wind: props.wind(),
      zIndex: props.zIndex(),
      autoResize: props.autoResize(),
    });
    (Snowflakes as any).prototype.appendStyles = originalAppendStylesFn;

    if (props.container()) {
      const originalInjectStyleFn: (style: string, cont?: HTMLElement) => void =
        // eslint-disable-next-line @typescript-eslint/dot-notation -- intentionally overriding private fields
        snowflakes["injectStyle"];

      // eslint-disable-next-line @typescript-eslint/dot-notation -- intentionally overriding private fields
      snowflakes["injectStyle"] = (style: string, cont?: HTMLElement) => {
        if (style.startsWith(".snowflake{")) {
          // main style, will not be called again, save it somewhere global
          mainSnowflakeStyle.set(style);
          // We'll manually inject it, ignore original implementation
          return;
        }
        if (!cont) {
          const styleContainer = document.createElement("style");
          stylesContainers.set((old) => [...old, styleContainer]);
          originalInjectStyleFn.apply(snowflakes, [style, styleContainer]);
        } else {
          originalInjectStyleFn.apply(snowflakes, [style]);
        }
      };
    }

    // Append styles our custom elements now
    originalAppendStylesFn.apply(snowflakes);

    // eslint-disable-next-line @typescript-eslint/dot-notation -- intentionally overriding private fields
    const originalRemoveStylesFn = snowflakes["removeStyles"];
    // eslint-disable-next-line @typescript-eslint/dot-notation -- intentionally overriding private fields
    snowflakes["removeStyles"] = () => {
      stylesContainers.set([]);
      originalRemoveStylesFn.apply(snowflakes);
    };

    return snowflakes;
  });
  createEffect(() => {
    const localSnowflakes = snowflakes();
    localSnowflakes.start();
    onCleanup(() => {
      localSnowflakes.stop();
    });
    onCleanup(() => {
      localSnowflakes.destroy();
    });
  });
  const c = children(() => props.children()?.(snowflakes()));
  return (
    <>
      {c()}
      {stylesContainers.get()}
      <Show when={mainSnowflakeStyle.get()}>
        <style>{mainSnowflakeStyle.get()}</style>
      </Show>
      {/* <style>{snowflakesCss}</style>
      <style>{snowflakes2Css}</style> */}
    </>
  );
});

export default MagicSnowflakes;
