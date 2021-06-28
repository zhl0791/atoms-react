import { Atom } from './atom';

export const selectAtom = <Value, Slice>(
  atomInstance: Atom<Value>,
  selector: (value: Value) => Slice,
  equalityFn?: (pre: Slice, next: Slice) => boolean,
): Atom<Slice> => {
  const box = {
    value: selector(atomInstance.value),
    updaters: new Map(),
    update: (value: Slice) => {},
  };
  const setValue = () => {
    const newValue = selector(atomInstance.value);
    if (equalityFn) {
      if (!equalityFn(box.value, newValue)) {
        box.updaters.forEach((value, fun: any) => fun((v: boolean) => !v));
      }
    } else if (box.value !== newValue) {
      box.updaters.forEach((value, fun: any) => fun((v: boolean) => !v));
    }
    box.value = newValue;
  };
  atomInstance.updaters.set(setValue, true);
  return box;
};
