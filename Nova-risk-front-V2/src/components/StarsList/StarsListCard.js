import React, { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { loadStars, deleteStar } from "../../Services/Services"; // Asegúrate de importar deleteStar

const StarsListCard = ({ onEdit }) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Realizar la solicitud para cargar las estrellas cuando el componente se monta
    loadStars()
      .then((response) => {
        setStars(response.data); // Establecer las estrellas en el estado local
      })
      .catch((error) => {
        console.error("Error loading stars:", error);
      });
  }, []);

  const handleDelete = (_id) => {
    // Llama a la función deleteStar para eliminar la estrella por su ID
    deleteStar(_id)
      .then(() => {
        // Actualiza el estado local para reflejar la eliminación
        setStars((prevStars) => prevStars.filter((star) => star._id !== _id));
      })
      .catch((error) => {
        console.error("Error deleting star:", error);
      });
  };

  return (
    <Container fluid className="StarListCard-section">
      {stars.map((star) => (
        <Card key={star.hip} className="mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between mb-1">
              <div className="fw-bold">{star.hip}</div>
              <div className="text-muted small">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="cursor-pointer"
                  onClick={() => onEdit(star)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="cursor-pointer ms-2 trash-icon"
                  onClick={() => handleDelete(star._id)} // Llama a handleDelete con el ID de la estrella
                  style={{
                    color: "initial",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                />
              </div>
            </div>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default StarsListCard;
