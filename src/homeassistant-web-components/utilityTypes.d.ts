type ConvertEventsToProperties<E extends Record<string, undefined | unknown>> =
  {
    [K in Capitalize<
      Extract<keyof E, string>
    > as `on${K}`]?: E[K] extends undefined
      ? (e: Event) => void
      : E[K] extends Event
        ? (e: E[K]) => void
        : (e: CustomEvent<E[K]>) => void;
  };

type Overwrite<T, NewT> = Omit<T, keyof NewT> & NewT;

type NonFunctionPropertyNames<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
