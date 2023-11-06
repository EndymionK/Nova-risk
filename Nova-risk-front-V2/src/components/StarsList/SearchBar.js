import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";


export default function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchText); 
  };

  return (
    <Container>
      <Row style={{ justifyContent: "center" }}>
        <Col sm={30} className="search-bar-container">
          <Form className="d-flex">
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
              onClick={handleSearch}
            >
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
