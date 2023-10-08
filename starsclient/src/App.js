import logo from './logo.svg';
import './App.css';
import { Col, Container, Row } from 'reactstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import StarsList from './StarsList';
import React from 'react';
import StarsForm from './StarsForm';


function App() {
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadStars = () => {
    axios.get('http://localhost:8080/Stars')
      .then(({ data }) => {
        setStars(data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadStars();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col md={6}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <StarsList stars={stars} />
            )}
          </Col>
          <Col  md={6}>              
              <StarsForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;