import React, { useState, useEffect } from "react";
import { Card, Container, Modal, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { loadStars, deleteStar } from "../../Services/Services";
import Pagination from "react-bootstrap/Pagination";
import StarName from "./StarName";
import LoadingPopup from "../LoadingPopup";
import SearchBar from "./SearchBar";

const StarsListCard = ({ onEdit }) => {
  const [starsPage, setStarsPage] = useState({ content: [], totalElements: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [starsPerPage] = useState(33);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [starToDelete, setStarToDelete] = useState(null);
  const [searchText, setSearchText] = useState(""); 

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

  const loadStarsBySearch = () => {
    loadStars(currentPage - 1, starsPerPage, searchText)
      .then((response) => {
        console.log("Respuesta del servicio:", response);
  
        if (response && response.content) {
          setStarsPage(response);
          setLoading(false);
        } else {
          console.error("La respuesta del servicio no contiene datos válidos.");
        }
      })
      .catch((error) => {
        console.error("Error loading stars:", error);
      });
  };

  const handleDelete = (_id) => {
    setStarToDelete(_id);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    deleteStar(starToDelete)
      .then(() => {
        loadStarsBySearch();
      })
      .catch((error) => {
        console.error("Error deleting star:", error);
      });

    setShowDeleteConfirmation(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    loadStarsBySearch();
  }, [currentPage, starsPerPage, searchText]);

  const totalPages = Math.ceil(starsPage.totalElements / starsPerPage) || 1;


  const handleSearch = (searchText) => {
    setCurrentPage(1);
    setSearchText(searchText);
  };

  return (
    <Container fluid className="StarListCard-section">
      <LoadingPopup message="Loading stars list..." loading={loading} />
      <SearchBar onSearch={handleSearch} />
      <Row>
        {searchText
          ? starsPage.content.map((star) => (
              <Col key={star._id} md={4}>
                <Card className="mb-3">
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-1">
                      <StarName star={star} />
                      <div className="text-muted small">
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="cursor-pointer"
                          onClick={() => onEdit(star)}
                          style={{
                            color: "initial",
                            cursor: "pointer",
                          }}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="cursor-pointer ms-2 trash-icon"
                          onClick={() => handleDelete(star._id)}
                          style={{
                            color: "initial",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : starsPage.content.map((star) => (
              <Col key={star._id} md={4}>
                <Card className="mb-3">
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-1">
                      <StarName star={star} />
                      <div className="text-muted small">
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="cursor-pointer"
                          onClick={() => onEdit(star)}
                          style={{
                            color: "initial",
                            cursor: "pointer",
                          }}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="cursor-pointer ms-2 trash-icon"
                          onClick={() => handleDelete(star._id)}
                          style={{
                            color: "initial",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
      </Row>

      <Modal
        show={showDeleteConfirmation}
        onHide={cancelDelete}
        className="modal-header"
      >
        <Modal.Header closeButton className="modal-popup">
          <Modal.Title>Confirm removal</Modal.Title>
          <span className="wave" role="img" aria-labelledby="wave">
            ❗
          </span>
        </Modal.Header>
        <Modal.Body className="modal-popup">
          <p>Are you sure you want to remove this star?</p>
        </Modal.Body>
        <Modal.Footer className="modal-popup">
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

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
            {item === "ellipsis" ? <Pagination.Ellipsis disabled /> : item}
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
