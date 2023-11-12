import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export default function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchText);
  };

  return (
    <Container>
      <Row style={{ justifyContent: "center" }} className="search-bar-container">
        <Col sm={30}>
          <Form onSubmit={handleSearch} className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchText}
              onChange={handleSearchChange}
            />
            <Button
              style={{ backgroundColor: "#1b222c" }}
              type="submit"
            >
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
