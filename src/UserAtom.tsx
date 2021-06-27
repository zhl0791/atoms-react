import React, { useState, memo, useMemo, useEffect } from 'react';
import { atom, useAtom } from './react-atom';

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
