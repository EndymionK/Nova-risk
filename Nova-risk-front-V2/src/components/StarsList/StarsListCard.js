import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const StarsListCard = ({ stars, onDelete, onEdit }) => {
  if (!stars || !Array.isArray(stars)) {
    return null; // O muestra un mensaje de error o un componente vacío si stars no está definida o no es una matriz.
  }

  return (
    <>
      <h3 className="mb-3"> My stars list </h3>

      {stars.map(star => (
        <div className="mb-3 border rounded p-3" key={star.hip}>
          <div className="d-flex justify-content-between mb-1">
            <div className="fw-bold">{star.hip}</div>
            <div className="text-muted small">
              <FontAwesomeIcon icon={faEdit} className="cursor-pointer" onClick={() => onEdit(star)} />
              <FontAwesomeIcon
                icon={faTrash}
                className="cursor-pointer ms-2 trash-icon"
                onClick={() => onDelete(star._id)}
                style={{
                  color: "initial",
                  cursor: "pointer",
                  fontSize: "1rem"
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default StarsListCard;

