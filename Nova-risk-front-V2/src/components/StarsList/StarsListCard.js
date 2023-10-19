import React, { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { loadStars, deleteStar } from "../../Services/Services";
import Pagination from "react-bootstrap/Pagination";
import StarName from "./StarName";

const StarsListCard = ({ onEdit }) => {
  const [starsPage, setStarsPage] = useState({ content: [], totalElements: 0 });
  const [currentPage, setCurrentPage] = useState(1); // Cambia la página inicial a 1.
  const [starsPerPage] = useState(15);

  useEffect(() => {
    loadStars(currentPage - 1, starsPerPage) // Resta 1 para que coincida con la indexación de la página en el backend.
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
        loadStars(currentPage - 1, starsPerPage)
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

  // Función para cambiar la página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(starsPage.totalElements / starsPerPage);

  const renderPaginationItems = () => {
    const paginationItems = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i <= 3 || i > totalPages - 3 || Math.abs(i - currentPage) <= 1) {
        paginationItems.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      } else if (paginationItems[paginationItems.length - 1] !== "ellipsis") {
        paginationItems.push("ellipsis");
      }
    }
    return paginationItems;
  };

  return (
    <Container fluid className="StarListCard-section">
      {starsPage.content.map((star) => (
        <Card key={star._id} className="mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between mb-1">
              <StarName star={star} /> {/* Utiliza el componente StarInfo aquí */}
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
      <Pagination className="justify-content-center">
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {renderPaginationItems().map((item, index) => (
          <React.Fragment key={index}>
            {item === "ellipsis" ? (
              <Pagination.Ellipsis disabled />
            ) : (
              item
            )}
          </React.Fragment>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </Container>
  );
};

export default StarsListCard;
