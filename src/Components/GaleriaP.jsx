import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import React from 'react';
import Equipo from "../assets/Equipo.jpg";
import Tratamientos from "../assets/Tratamientos.jpg";
import Filosofia from "../assets/Filosofia.jpg";
import MasajesS from "../assets/MasajesSala.jpeg";  
import Aroma from "../assets/Aroma.jpg";
import Reflexo from "../assets/Reflexo.jpg";
import Piedras from "../assets/Piedras.jpg";
import Vistas from './ui/vistas';
import Sauna from "../assets/Sauna.jpeg";
import { ButtonComponent } from "./ui/ButtonComponent";
import Carrusel from './ui/Carrusel';
import Masajes from "../assets/Masajes.jpg";
import living from "../assets/living.jpg";
import Pelu from "../assets/Pelu.jpg";
import techo from "../assets/techo.jpg";
import pasillo from "../assets/pasillo.jpg";
function FluidExample() {
  return <Image src="holder.js/100px250" fluid />;
}

function GaleriaP() {
  return (
    <Container>
     
     <Row className="row-eq-height">
        <Col style={{ padding: '10px' }}>
          <img src={Pelu} alt="Piedras" className="img-fluid" />
        </Col>
        <Col style={{ padding: '10px' }}>
          <img src={techo} alt="Piedras" className="img-fluid" />
        </Col>
        <Col style={{ padding: '10px' }}>
          <img src={living} alt="Piedras" className="img-fluid" />
        </Col>
      </Row>
      <Row>
        <Col>
          <img src={Sauna} alt="Sauna" className="img-fluid" />
          <img src={pasillo} alt="Piedras" className="img-fluid" style={{ display: 'block' }} />
        </Col>
        <Col>
          <img src={MasajesS} alt="SalaMasajes" className="img-fluid" />
        </Col>
      </Row>
      
    </Container>
  );
}

export default GaleriaP;