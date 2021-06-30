import React from 'react';
import './App.css';
import TestAtom from './TestAtom';
import { Provider } from './react-atom';

function App() {
  return (
    <div className="App">
      <Provider>
        <TestAtom />
      </Provider>
      <hr />
      <Provider>
        <TestAtom />
      </Provider>
    </div>
  );
}

export default App;
