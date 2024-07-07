import {
  createSignal,
  type SignalOptions,
  type Accessor,
  type Setter,
  type Component,
} from "solid-js";

type Signal2<T> = {
  get: Accessor<T>;
  set: Setter<T>;
};

export function createSignal2<T>(): Signal2<T | undefined>;
export function createSignal2<T>(
  value: T,
  options?: SignalOptions<T>
): Signal2<T>;
export function createSignal2<T>(
  value?: T,
  options?: SignalOptions<T | undefined>
) {
  if (value === undefined) {
    const [get, set] = createSignal<T>();
    return { get, set } satisfies Signal2<T | undefined>;
  }
  const [get, set] = createSignal<T>(value, options);
  return { get, set } satisfies Signal2<T>;
}

type WrapWithAccessor<T extends object> = { [K in keyof T]-?: () => T[K] };

export function wrapWithAccessor<T extends object>(
  props: T
): WrapWithAccessor<T> {
  const prox = new Proxy<T>(props, {
    get(...args) {
      return () => Reflect.get(...args);
    },
  });

  const proxyWithAccessors = prox as WrapWithAccessor<T>;
  return proxyWithAccessors;
}

export function createComponent2<T extends object>(
  component: Component<WrapWithAccessor<T>>
) {
  return (props: T) => component(wrapWithAccessor(props));
}
