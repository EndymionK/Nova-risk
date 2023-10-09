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

  const deleteStar = (_id) => {
    axios.delete(`http://localhost:8080/Stars/${_id}`)
      .then(() => loadStars())
      .catch(error => console.log(error));
  };
    

  useEffect(() => {
    loadStars();
  }, []);

  const createStar = (values) => {
    axios.post('http://localhost:8080/Stars', values)
      .then(() => loadStars())
       
  }

  return (
    <>
      <Container>
        <Row>
          <Col md={6}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <StarsList stars={stars} onDelete={deleteStar} />
            )}
          </Col>
          <Col  md={6}>              
              <StarsForm createStar={createStar} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;