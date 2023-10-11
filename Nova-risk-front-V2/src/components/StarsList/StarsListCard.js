import React, { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { loadStars, deleteStar } from "../../Services/Services";
import { Link } from "react-router-dom";
import { Pagination } from "react-bootstrap";

const StarsListCard = ({ onEdit }) => {
  const [starsPage, setStarsPage] = useState({ content: [], totalElements: 0 });
  const [currentPage, setCurrentPage] = useState(0);
  const [starsPerPage] = useState(5);

  useEffect(() => {
    loadStars(currentPage, starsPerPage)
      .then((response) => {
        setStarsPage(response.data);
      })
      .catch((error) => {
        console.error("Error loading stars:", error);
      });
  }, [currentPage, starsPerPage]);

  const handleDelete = (_id) => {
    deleteStar(_id)
      .then(() => {
        // Actualiza la página actual después de eliminar una estrella.
        loadStars(currentPage, starsPerPage)
          .then((response) => {
            setStarsPage(response.data);
          })
          .catch((error) => {
            console.error("Error loading stars:", error);
          });
      })
      .catch((error) => {
        console.error("Error deleting star:", error);
      });
  };

  const catalogNames = {
    hip: "Hipparcos Catalog",
    hd: "Henry Draper Catalog",
    hr: "Harvard Revised Catalog",
    gl: "Gliese Catalog",
    bf: "Bayer / Flamsteed Designation",
  };

  const getNumberToShow = (star) => {
    const mandatoryVariables = ["hip", "hd", "hr", "gl", "bf"];
    for (const variable of mandatoryVariables) {
      if (star[variable]) {
        return `${catalogNames[variable]}: ${star[variable]}`;
      }
    }
    return "N/A";
  };

  // Función para cambiar la página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber - 1); // Resta 1 para que coincida con la indexación de la página en el backend.
  };

  return (
    <Container fluid className="StarListCard-section">
      {starsPage.content.map((star) => (
        <Card key={star._id} className="mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between mb-1">
              <div className="fw-bold">
                <Link to={`/star/${star._id}`} className="link-no-underline">
                  {getNumberToShow(star)}
                </Link>
              </div>
              <div className="text-muted small">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="cursor-pointer"
                  onClick={() => onEdit(star)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="cursor-pointer ms-2 trash-icon"
                  onClick={() => handleDelete(star._id)}
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
      {/* Paginación */}
      <Pagination>
        {Array(Math.ceil(starsPage.totalElements / starsPerPage))
          .fill()
          .map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
      </Pagination>
    </Container>
  );
};

export default StarsListCard;
