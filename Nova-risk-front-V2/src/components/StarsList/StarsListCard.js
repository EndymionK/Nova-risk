import React, { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { loadStars, deleteStar } from "../../Services/Services";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";

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

  const catalogNames = {
    proper: "Proper Name",
    hip: "Hipparcos Catalog",
    hd: "Henry Draper Catalog",
    hr: "Harvard Revised Catalog",
    gl: "Gliese Catalog",
    bf: "Bayer / Flamsteed Designation",
  };
  
  const getNumberToShow = (star) => {
    if (star.proper) {
      return `${catalogNames.proper}: ${star.proper}`;
    } else if (!isNaN(star.hip)) {
      return `${catalogNames.hip}: ${star.hip}`;
    } else if (!isNaN(star.hd)) {
      return `${catalogNames.hd}: ${star.hd}`;
    } else if (!isNaN(star.hr)) {
      return `${catalogNames.hr}: ${star.hr}`;
    } else if (star.gl) {
      return `${catalogNames.gl}: ${star.gl}`;
    } else if (!isNaN(star.bf)) {
      return `${catalogNames.bf}: ${star.bf}`;
    }
    return "No catalog number available";
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
