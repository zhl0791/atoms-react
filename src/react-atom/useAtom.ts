import React, { useState, useEffect } from 'react';
import { Atom } from './atom';

export const useAtom = <Value>(
  atomInstance: Atom<Value>,
): [Value, (value: Value) => void] => {
  const [, setState] = useState(false);

  useEffect(() => {
    atomInstance.updaters.set(setState, true);

    return () => {
      atomInstance.updaters.delete(setState);
    };
  }, [atomInstance]);

  return [atomInstance.value, atomInstance.update];
};
