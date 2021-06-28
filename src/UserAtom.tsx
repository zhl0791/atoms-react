import React, { useState, memo, useMemo, useEffect } from 'react';
import { atom, selectAtom, useAtom } from './react-atom';

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

const Child2 = memo(() => {
  const [value] = useAtom(sliceAtom);
  console.log(value);

  return <p>I'm Child2: {value}</p>;
});

export default memo(() => {
  const [value, setValue] = useAtom(countAtom);
  const [base, setBase] = useAtom(baseAtom);

  return (
    <div>
      <p>I'm Father: {value}</p>
      <button onClick={() => setValue(value + 1)}>Father: +1</button>

      <p>des: {base.des}</p>
      <button onClick={() => setBase({ ...base, des: Date.now().toString() })}>
        update des
      </button>
      <Child />

      <Child2 />
    </div>
  );
});
