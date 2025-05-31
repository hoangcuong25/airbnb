"use client";

import { useEffect } from 'react';

const FontAwesomeLoader = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    link.integrity = 'sha512-9usAa10IRO0HjjFJfFMZNMo//eschCqfaBSQeifzGuO0+wQ6umvlHaVz8KedKzFGzizzTyT+GwInkGBcEIerLkQ==';
    link.crossOrigin = 'anonymous';
    link.referrerPolicy = 'no-referrer';

    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default FontAwesomeLoader; 