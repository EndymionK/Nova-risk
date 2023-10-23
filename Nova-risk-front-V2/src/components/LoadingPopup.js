import React, { useState, useEffect } from 'react';
import { Modal, Spinner } from 'react-bootstrap';

function LoadingPopup({ message, loading }) {
  const [show, setShow] = useState(loading);

  useEffect(() => {
    if (loading) {
      setShow(true);
    } else {
      // Agregar un pequeño retardo para que el aviso no desaparezca inmediatamente
      setTimeout(() => {
        setShow(false);
      }, 500);
    }
  }, [loading]);

  return (
    <Modal show={show} centered>
      <Modal.Body>
        <div className="d-flex align-items-center">
          <Spinner animation="border" variant="primary" />
          <div className="ms-2">{message}</div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LoadingPopup;
