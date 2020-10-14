import React from 'react';
import logo from './logo.svg';
import ConnectionInfo from './Components/ConnectionInfo/ConnectionInfo.jsx'
import './App.css';

function App() {

  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ConnectionInfo />
      </header>
    </div>
  );
}


export default App;
