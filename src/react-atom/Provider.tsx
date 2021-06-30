import React, { useMemo } from 'react';

export const Context = React.createContext<symbol | null>(null);

/**
 * A Provider is a component that contains a store and provides atom values under the component tree.
 * A Provider works just like React context provider. If you don't use a Provider, it works as
 * provider-less mode with a default store. A Provider will be necessary if we need to hold different
 * atom values for different component trees. Provider also has some capabilities described below,
 * which doesn't exist in the provider-less mode.
 */
export const Provider: React.FC = (props) => {
  const symbol = useMemo(() => Symbol('atoms-react'), []);

  return <Context.Provider value={symbol}>{props.children}</Context.Provider>;
};
