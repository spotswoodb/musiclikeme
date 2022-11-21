import './App.css';
import React from "react";
import Navigation from './components/navigation'
import Pages from './components/pages'


function App() {

  
  return (

    <div className="App">
      <div>
        <Navigation />
        <Pages />
      </div>
    </div>
  );
}

export default App;
