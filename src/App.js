import React from 'react';
import logo from './logo.svg';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Home from './Home/';
function App() {
  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
