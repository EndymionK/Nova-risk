import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillGithub} from "react-icons/ai";
import SwiperText from "./SwiperText";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>      
        <Row md={8} className="home-about-description">
          <h1 style={{ fontSize: "4em" }}>
            <span className="purple"> Curious </span> Data
          </h1>
        </Row>
        <SwiperText />
        <Row>
          <Col md={12} className="home-about-social">
            <h1>Github profile</h1>

            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/EndymionK"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
            </ul>
          </Col>
              
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
