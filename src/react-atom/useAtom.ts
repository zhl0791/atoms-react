import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Atom, AtomCreator } from './atom';
import { Context } from './Provider';

const globalSymbol = Symbol('atoms-react');

export const useAtom = <Value>(
  atomCreator: AtomCreator<Value>,
): [Value, (value: Value) => void] => {
  const [, setState] = useState(false);
  const key = useContext(Context) || globalSymbol;
  const atomInstance = useMemo(() => atomCreator(key), [key]);

  useEffect(() => {
    atomInstance.updaters.set(setState, true);

    return () => {
      atomInstance.updaters.delete(setState);
    };
  }, [atomInstance]);

  return [atomInstance.value, atomInstance.update];
};
