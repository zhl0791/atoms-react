import React from 'react';
import { RecoilRoot } from 'recoil';
import InfiniteLoading from './InfiniteLoading';
import RecoilTest from './RecoilTest';
import './App.css';
import UserAtom from './UserAtom';

function App() {
  return (
    <div className="App">
      {/*<InfiniteLoading />*/}
      <UserAtom />
      {/*<RecoilRoot>*/}
      {/*  <RecoilTest />*/}
      {/*</RecoilRoot>*/}
    </div>
  );
}

export default App;
