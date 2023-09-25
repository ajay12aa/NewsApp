
import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';

import React, { Component } from 'react'


export class App extends Component {
  render() {
    return (
      <div >

        <Navbar />

       
        <News pageSize={3} category='science'  />
      </div>
    )
  }
}

export default App
