import React from 'react';
import {StatusBar} from 'expo-status-bar';
import Home from './views/Home';

const App = () => {
  return (
    <>
      <Home></Home>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
