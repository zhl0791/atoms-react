import React from 'react';

interface Atom<Value> {
    value: Value;
    updaters: Map<any, boolean>;
    update: (value: Value) => void;
}
declare type AtomCreator<Value> = (key: symbol) => Atom<Value>;
declare const atom: <Value>(initValue: Value) => AtomCreator<Value>;

declare const useAtom: <Value>(atomCreator: AtomCreator<Value>) => [Value, (value: Value) => void];

declare const selectAtom: <Value, Slice>(atomCreator: AtomCreator<Value>, selector: (value: Value) => Slice, equalityFn?: ((pre: Slice, next: Slice) => boolean) | undefined) => AtomCreator<Slice>;

declare const Context: React.Context<symbol | null>;
/**
 * A Provider is a component that contains a store and provides atom values under the component tree.
 * A Provider works just like React context provider. If you don't use a Provider, it works as
 * provider-less mode with a default store. A Provider will be necessary if we need to hold different
 * atom values for different component trees. Provider also has some capabilities described below,
 * which doesn't exist in the provider-less mode.
 */
declare const Provider: React.FC;

export { Atom, AtomCreator, Context, Provider, atom, selectAtom, useAtom };
