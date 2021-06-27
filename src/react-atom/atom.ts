export const atom = (initValue: any) => {
  const box = {
    value: initValue,
    updaters: new Map(),
    update: (value: any) => {
      if (box.value !== value) {
        box.value = value;
        box.updaters.forEach((value, fun: any) => fun((v: boolean) => !v));
      }
    },
  };
  return box;
};
