import React, { Component } from 'react';
// import logo from './logo.svg';
import beerbottle from '../public/beerbottle.png'
import List from './List'
import './App.css';


class App extends Component {


  render() {


    return (
      <div className="App">
        <div className="App-header">
          <img src={beerbottle} className="App-logo" alt="logo" />
          <h2>Welcome to Beermo</h2>
        </div>
        <List />

      </div>
    );
  }
}

export default App;
