import React, { useState, useEffect } from 'react';

function LoadingPopup({ message, loading }) {
  const [isVisible, setIsVisible] = useState(loading);

  useEffect(() => {
    if (loading) {
      setIsVisible(true);
    } else {
      // Agregar un pequeño retardo para que el aviso no desaparezca inmediatamente
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }
  }, [loading]);

  return isVisible ? (
    <div className="loading-popup">
      <div className="loading-square">
        <div className="loading-message">{message}</div>
      </div>
    </div>
  ) : null;
}

export default LoadingPopup;
