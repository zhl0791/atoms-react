export interface Atom<Value> {
  value: Value;
  updaters: Map<any, boolean>;
  update: (value: Value) => void;
}

export const atom = <Value>(initValue: Value): Atom<Value> => {
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
  return box;
};
