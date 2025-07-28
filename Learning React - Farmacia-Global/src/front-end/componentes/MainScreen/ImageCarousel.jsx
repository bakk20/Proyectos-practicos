import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/ImageCarusel.css';
import logofarmacia from '../../../assets/Logo-farmacia.png';
import vaporwave from '../../../assets/vaporwave.jpg';
import vaporwave2 from '../../../assets/vaporwave2.jpg';
const images = [
  logofarmacia,
  vaporwave,
  vaporwave2
];


export const ImageCarousel = () => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null); // 👈 Referencia al intervalo

  useEffect(() => {
    // Iniciar autoplay solo una vez
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 15000);

    return () => clearInterval(intervalRef.current); // Limpieza al desmontar
  }, []);

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // 👈 Detener autoplay
      intervalRef.current = null;
    }
  };

  const handlePrev = () => {
    stopAutoplay();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    stopAutoplay();
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <>
    <div className="carousel-slider-wrapper">      
      <div className='carousel-container'>
      <button className="carousel-btn prev" onClick={handlePrev}>‹</button>

      <motion.div
        className="carousel-slider"
        animate={{ x: `-${index * 100}%` }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        {images.map((src, i) => (
          <div className="carousel-slide" key={i}>
            <img src={src} alt={`img-${i}`} className="carousel-image" />
          </div>
        ))}
      </motion.div>

      <button className="carousel-btn next" onClick={handleNext}>›</button>
      </div>
    </div>
    </>
  );
};