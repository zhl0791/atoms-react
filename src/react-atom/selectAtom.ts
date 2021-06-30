import { Atom, AtomCreator } from './atom';

export const selectAtom = <Value, Slice>(
  atomCreator: AtomCreator<Value>,
  selector: (value: Value) => Slice,
  equalityFn?: (pre: Slice, next: Slice) => boolean,
): AtomCreator<Slice> => {
  return (key: symbol): Atom<Slice> => {
    const dependency = atomCreator(key);

    const box = {
      value: selector(dependency.value),
      updaters: new Map(),
      update: (value: Slice) => {},
    };

    const setValue = () => {
      const newValue = selector(dependency.value);

      if (equalityFn) {
        if (!equalityFn(box.value, newValue)) {
          box.updaters.forEach((value, fun: any) => fun((v: boolean) => !v));
        }
      } else if (box.value !== newValue) {
        box.updaters.forEach((value, fun: any) => fun((v: boolean) => !v));
      }

      box.value = newValue;
    };

    dependency.updaters.set(setValue, true);
    return box;
  };
};
