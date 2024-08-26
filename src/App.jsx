import React from 'react';
import Header from '/src/Components/Header.jsx';
import Body from '/src/Components/Body.jsx';
import Contact from '/src/Components/Contact.jsx';
import GaleriaP from '/src/Components/GaleriaP.jsx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Portada from './Components/Portada';
function App() {
  return (
    <>
      <Header />
      <div>
      <Portada />
      </div>
      
      <div  >
        <Body />
      </div>
      <div >
        <Contact />
      </div>
    </>
  );
}

export default App;
