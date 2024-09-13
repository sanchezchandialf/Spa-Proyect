import React from 'react';
import { Grid, Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import { motion } from 'framer-motion'; // Import Framer Motion
import { ChevronRight } from 'lucide-react'; // Import Lucide React Icon
import ContainerFluido from './Container';
import Masajes from '../../assets/Masajes.jpg';
import ContainerFluido2 from './Container2';
import MasajesSala from '../../assets/MasajesSala.jpeg';
import ServicesSection from './ServiceSeccion';
import CommentsSection from './ComentarioLista';

// Animations configuration for smooth transitions
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: 'easeOut' } }
};



// Componente principal de servicios con animaciones
const SpaServices = () => {
  return (
    <motion.div style={{ width: '100%' }} initial="hidden" animate="visible" variants={fadeIn}> {/* Animación al cargar */}
      <Typography variant="h4" align="center" gutterBottom>
        Nuestros Servicios de Spa
      </Typography>

      {/* Sección "Sentite Bien" */}
      <motion.section className="flex items-center justify-center h-screen bg-[#26552d] text-white w-full"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
        <div className="text-center">
          <motion.h1 className="text-9xl font-bold text-white " initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
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

      <ServicesSection  />
      <CommentsSection />
    </motion.div>
  );
};

export default SpaServices;
