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
  const imgStyles = 'w-full h-full object-cover rounded-lg';

  return (
    <Container fluid className="p-4">
      {/* Primera fila: 2 columnas */}
      <Row className="mb-4">
        <Col sm={12} md={6} className="p-2">
          <img src={Pelu} alt="Peluquería" className={imgStyles} />
        </Col>
        <Col sm={12} md={6} className="p-2">
          <img src={techo} alt="Techo" className={imgStyles} />
        </Col>
      </Row>
      
      {/* Segunda fila: 3 columnas */}
      <Row>
        <Col sm={12} md={4} className="p-2">
          <img src={living} alt="Living" className={imgStyles} />
        </Col>
        <Col sm={12} md={4} className="p-2">
          <img src={Sauna} alt="Sauna" className={imgStyles} />
        </Col>
        <Col sm={12} md={4} className="p-2">
          <img src={MasajesS} alt="Sala de Masajes" className={imgStyles} />
        </Col>
      </Row>
    </Container>
  );
}

export default GaleriaP;
