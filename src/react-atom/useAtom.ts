import React, { useState, useEffect } from 'react';

export const useAtom = (atomInstance: any): [any, (value: any) => void] => {
  const [, setState] = useState(false);

  useEffect(() => {
    atomInstance.updaters.set(setState, true);

    return () => {
      atomInstance.updaters.delete(setState);
    };
  }, [atomInstance]);

  return [atomInstance.value, atomInstance.update];
};
