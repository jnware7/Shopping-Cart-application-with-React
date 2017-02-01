import React, { Component } from 'react';
// import logo from './logo.svg';
import beerbottle from '../public/beerbottle.png'
import List from './List'
import './App.css';

class App extends Component {
  // constructor(props) {
  //   super(props)
  //
  //   this.state = {
  //     Beers : []
  //   }
  //
  // }

//   componentDidMount() {
//     this.getAllBeers()
//   }
//
// // initial fetch to retrive stored Beers from DB.
//   getAllBeers() {
//     fetch('http://localhost:5000/beers',{
//       method: 'get',
//     })
//     .then(response => response.json())
//     .then(results => {
//       this.setState({
//         Beers: results
//       })
//     })
//   }




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

// beers={this.state.Beers}

export default App;
