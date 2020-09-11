import React from 'react';
import logo from './logo.svg';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Top from './Components/top/';
import List from './Components/lists/';
import Home from './Home/';
function App() {
  return (
    <div className="App">
       <Switch >
        <Route exact path="/" >
            <Home/>
        </Route>
        <Route path='/top'>
            <Top/>
        </Route>
        <Route path='/list'>
            <List/>
        </Route>
        </Switch>
    </div>
  );
}

export default App;
