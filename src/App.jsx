import React ,{useState}from 'react';
import Header from '/src/Components/Header.jsx';
import Body from '/src/Components/Body.jsx';
import Contact from '/src/Components/Contact.jsx';
import GaleriaP from '/src/Components/GaleriaP.jsx';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Portada from './Components/Portada';

import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';


function App() {

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] =useState(false);

  return (
    <>
      <Header onRegisterClick={()=> setIsRegisterOpen(true)} onLoginClick={() => setIsLoginOpen(true)}/>
      
      <Login 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />

      <Register 
        isOpen={isRegisterOpen}
        onClose={()=> setIsRegisterOpen(false)}
      />
      
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
