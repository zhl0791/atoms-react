# atoms-react &middot; [![NPM Version](https://img.shields.io/npm/v/atoms-react)](https://www.npmjs.com/package/atoms-react) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/zhl0791/atoms-react/blob/main/LICENSE)

atoms-react is A mini state management library for React.

Demo: [https://codesandbox.io/s/jovial-cookies-fdw2r](https://codesandbox.io/s/jovial-cookies-fdw2r)

## Installation

```shell
npm install atoms-react
```

Or if you're using [yarn](https://classic.yarnpkg.com/en/docs/install/):

```shell
yarn add atoms-react
```

## Example

```tsx
import React, { memo } from 'react';
import { atom, useAtom, selectAtom } from 'atoms-react';

const countAtom = atom(0);

const baseAtom = atom({ text: 'text!!!', des: 'des!!!' });

const sliceAtom = selectAtom(
  baseAtom,
  (value) => value.text,
  (pre, next) => pre === next,
);

const Child = memo(() => {
  const [value, update] = useAtom(countAtom);

  return (
    <>
      <p>I'm Child: {value}</p>
      <button
        onClick={() => {
          update(value + 1);
        }}
      >
        Child: +1
      </button>
    </>
  );
});

export default memo(() => {
  const [value, setValue] = useAtom(countAtom);

  return (
    <div>
      <p>I'm Father: {value}</p>
      <button onClick={() => setValue(value + 1)}>Father: +1</button>
      <Child />
    </div>
  );
});
```

### for react library

A `Provider` will be necessary if we need to hold different atom values for different component trees.

`Provider` commonly used with library. 

```tsx
import React from 'react';
import { atom, useAtom, Provider } from 'atoms-react';

const countAtom = atom(0);

const DemoComponent = memo(() => {
  const [value, setValue] = useAtom(countAtom);

  return (
    <>{value}</>
  );
});

const Wrapper = (Component: typeof DemoComponent) => (props: any) => (
  <Provider>
    <Component {...props} />
  </Provider>
);

export default Wrapper(DemoComponent);
```

### License

atoms-react is [MIT licensed](./LICENSE).
