# react-atom &middot; [![NPM Version](https://img.shields.io/npm/v/react-atom)](https://www.npmjs.com/package/react-atom) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebookexperimental/Recoil/blob/master/LICENSE)

react-atom is A mini state management library for React.

Demo: [https://codesandbox.io/s/jovial-cookies-fdw2r](https://codesandbox.io/s/jovial-cookies-fdw2r)

## Example

```tsx
import React, { memo } from 'react';
import { atom, useAtom } from 'react-atom';

const countAtom = atom(0);

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

## Installation

```shell
npm install react-atom
```

Or if you're using [yarn](https://classic.yarnpkg.com/en/docs/install/):

```shell
yarn add react-atom
```

### License

react-atom is [MIT licensed](./LICENSE).
