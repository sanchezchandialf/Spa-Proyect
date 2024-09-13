import React from 'react';
import { motion } from 'framer-motion';
import SpaNumbers from './NumberComponent';
import { Sparkles } from 'lucide-react';

const SpaNumero = () => {
  return (
    <div className="bg-gradient-to-br from-purple-100 to-pink-100 min-h-screen flex items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-2xl p-12 max-w-4xl w-full"
      >
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-8 text-center"
        >
          Descubre la Experiencia Spa
        </motion.h1>
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
          className="relative"
        >
          <SpaNumbers />
          <Sparkles className="absolute top-0 right-0 text-yellow-400 w-12 h-12 animate-pulse" />
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-xl text-gray-600 text-center"
        >
          Sumérgete en un mundo de relajación y bienestar. Nuestro spa te ofrece una experiencia única y rejuvenecedora.
        </motion.p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300 mx-auto block"
        >
          Reserva tu experiencia
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SpaNumero;