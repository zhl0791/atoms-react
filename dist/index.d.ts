declare const atom: (initValue: any) => {
    value: any;
    updaters: Map<any, any>;
    update: (value: any) => void;
};

declare const useAtom: (atomInstance: any) => [any, (value: any) => void];

export { atom, useAtom };
