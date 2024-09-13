import React from 'react';
import { Grid, Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import { motion } from 'framer-motion'; // Import Framer Motion
import { ChevronRight } from 'lucide-react'; // Import Lucide React Icon
import ContainerFluido from './Container';
import Masajes from '../../assets/Masajes.jpg';
import ContainerFluido2 from './Container2';
import MasajesSala from '../../assets/MasajesSala.jpeg';
// Animations configuration for smooth transitions
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: 'easeOut' } }
};

// Colores de fondo actualizados para las secciones
const sectionStyles = {
  masajes: { backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px'  },
  belleza: { backgroundColor: '#e8d1e8', padding: '20px', borderRadius: '8px', marginBottom: '20px' },
  faciales: { backgroundColor: '#f8e7a3', padding: '20px', borderRadius: '8px', marginBottom: '20px' },
  corporales: { backgroundColor: '#d7f0d1', padding: '20px', borderRadius: '8px', marginBottom: '20px' },
};

// Datos de los servicios
const spaServices = {
  masajes: [
    { title: 'Anti-stress', description: 'Masaje relajante para reducir el estrés y la tensión.' },
    { title: 'Descontracturantes', description: 'Alivia contracturas musculares y dolores.' },
    { title: 'Piedras Calientes', description: 'Masaje con piedras calientes que ayuda a la relajación profunda.' },
    { title: 'Circulatorios', description: 'Mejora la circulación sanguínea y oxigena los músculos.' },
  ],
  belleza: [
    { title: 'Lifting de Pestañas', description: 'Realza tus pestañas con un lifting natural.' },
    { title: 'Depilación Facial', description: 'Elimina el vello facial de manera efectiva.' },
    { title: 'Belleza de Manos y Pies', description: 'Cuida la belleza y salud de tus manos y pies.' },
  ],
  faciales: [
    { title: 'Punta de Diamante', description: 'Microexfoliación para renovar la piel.' },
    { title: 'Limpieza Profunda + Hidratación', description: 'Limpia e hidrata profundamente tu piel.' },
    { title: 'Crio Frecuencia Facial', description: 'Shock térmico que produce efecto lifting inmediato.' },
  ],
  corporales: [
    { title: 'VelaSlim', description: 'Reducción de circunferencia corporal y celulitis.' },
    { title: 'DermoHealth', description: 'Estimula la microcirculación y drena los líquidos acumulados.' },
    { title: 'Criofrecuencia Corporal', description: 'Efecto lifting instantáneo.' },
    { title: 'Ultracavitación', description: 'Técnica reductora no invasiva.' },
  ],
};

// Componente de tarjeta animada con Framer Motion
const ServiceCard = ({ title, description }) => (
  <motion.div variants={fadeInUp} initial="hidden" animate="visible" whileHover={{ scale: 1.05 }}>
    <Card sx={{ width: '100%', height: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" endIcon={<ChevronRight />}>Reservar</Button> {/* Lucide React Icon */}
      </CardActions>
    </Card>
  </motion.div>
);

// Componente principal de servicios con animaciones
const SpaServices = () => {
  return (
    <motion.div style={{ width: '100%' }} initial="hidden" animate="visible" variants={fadeIn}> {/* Animación al cargar */}
      <Typography variant="h4" align="center" gutterBottom>
        Nuestros Servicios de Spa
      </Typography>

      {/* Sección "Sentite Bien" */}
      <motion.section className="flex items-center justify-center h-screen bg-black text-white w-full"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
        <div className="text-center">
          <motion.h1 className="text-9xl font-bold text-white" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
            Sentite Bien
          </motion.h1>
          <motion.p className="mt-8 text-2xl italic text-gray-300" initial={{ y: 50 }} animate={{ y: 0 }}>
            "La relajación es la mejor forma de encontrarse con uno mismo. Un spa es el lugar donde cuerpo y mente se alinean."
          </motion.p>
          <motion.p className="mt-2 text-gray-400" initial={{ y: 50 }} animate={{ y: 0 }}>
            - Anónimo
          </motion.p>
        </div>
      </motion.section>

      <ContainerFluido imageSrc={Masajes} imageAlt={Masajes} columnTitle={"Masajes Relajantes"} columnText={"Nuestros Servicios de Spa"} />

      {/* Sección de Masajes */}
      <motion.div className="shadow-lg" style={sectionStyles.masajes} initial="hidden" animate="visible" variants={fadeInUp}>
        <Typography variant="h2" gutterBottom align="center" >
          Masajes
        </Typography>
        <Grid container spacing={3}>
          {spaServices.masajes.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ServiceCard title={service.title} description={service.description} />
            </Grid>
          ))}
        </Grid>
      </motion.div>
        <ContainerFluido  imageSrc={MasajesSala} imageAlt={"Belleza"}/>
      {/* Sección de Belleza */}
      <motion.div className="shadow-lg" style={sectionStyles.belleza} initial="hidden" animate="visible" variants={fadeInUp}>
        <Typography variant="h5" gutterBottom>
          Belleza
        </Typography>
        <Grid container spacing={3}>
          {spaServices.belleza.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ServiceCard title={service.title} description={service.description} />
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* Sección de Tratamientos Faciales */}
      <motion.div style={sectionStyles.faciales} initial="hidden" animate="visible" variants={fadeInUp}>
        <Typography variant="h5" gutterBottom>
          Tratamientos Faciales
        </Typography>
        <Grid container spacing={3}>
          {spaServices.faciales.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ServiceCard title={service.title} description={service.description} />
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* Sección de Tratamientos Corporales */}
      <motion.div style={sectionStyles.corporales} initial="hidden" animate="visible" variants={fadeInUp}>
        <Typography variant="h5" gutterBottom>
          Tratamientos Corporales
        </Typography>
        <Grid container spacing={3}>
          {spaServices.corporales.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ServiceCard title={service.title} description={service.description} />
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </motion.div>
  );
};

export default SpaServices;
