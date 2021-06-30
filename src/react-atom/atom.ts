export interface Atom<Value> {
  value: Value;
  updaters: Map<any, boolean>;
  update: (value: Value) => void;
}

export type AtomCreator<Value> = (key: symbol) => Atom<Value>;

export const atom = <Value>(initValue: Value): AtomCreator<Value> => {
  // store all atoms
  const container = new Map<symbol, Atom<Value>>();

  // key -> atom
  return (key: symbol): Atom<Value> => {
    if (!container.get(key)) {
      const box = {
        value: initValue,
        updaters: new Map(),
        update: (value: Value) => {
          if (box.value !== value) {
            box.value = value;
            box.updaters.forEach((value, fun: any) => fun((v: boolean) => !v));
          }
        },
      };
      container.set(key, box);
    }
    return container.get(key)!;
  };
};
