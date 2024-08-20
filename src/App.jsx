import React from 'react';
import Header from '/src/Components/Header.jsx';
import Body from '/src/Components/Body.jsx';
import About from '/src/Components/About.jsx';
import Contact from '/src/Components/Contact.jsx';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <div id="servicios" className="pt-20">
        <Body />
      </div>
      <div id="sobre-nosotros" className="pt-20">
        <About />
      </div>
      
      <div id="contacto" className="pt-20">
        <Contact />
      </div>
    </>
  );
}

export default App;
