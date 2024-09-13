import React, { useState, useEffect } from 'react';
import MotionNumber from 'motion-number';

const SpaNumbers = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const data = [
    { number: 5000, text: "Clientes satisfechos que confían en nosotros para su bienestar." },
    { number: 10, text: "Más de 10 años ofreciendo tratamientos de spa de alta calidad." },
    { number: 25, text: "Tratamientos exclusivos diseñados para relajarte y rejuvenecer." }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % data.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [data.length]);

  return (
    
      <div className="  rounded-lg p-10 text-center">
        <MotionNumber
          value={data[currentStep].number}
          duration={1000}
          format={{ notation: 'compact' }}
          locales="en-US"
          className="text-9xl font-bold text-black"
        />
        <p className="mt-4 text-3xl text-black">{data[currentStep].text}</p>
      </div>
    
  );
};

export default SpaNumbers;
