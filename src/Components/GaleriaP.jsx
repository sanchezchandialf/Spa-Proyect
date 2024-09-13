import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import MasajesS from "../assets/MasajesSala.jpeg";  
import Sauna from "../assets/Sauna.jpeg";
import living from "../assets/living.jpg";
import Pelu from "../assets/Pelu.jpg";
import techo from "../assets/techo.jpg";
import pasillo from "../assets/pasillo.jpg";

function GaleriaP() {
  return (
    <Container  bg="light">
     
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