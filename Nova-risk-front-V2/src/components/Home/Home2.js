import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Tilt from "react-parallax-tilt";
import { AiFillGithub} from "react-icons/ai";
import image555446 from "../../Assets/555446.jpg";


function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "4em" }}>
              About <span className="purple"> Nova Risk </span>
            </h1>
            <p className="home-about-body" style={{ fontSize: '4em' }}>
            Welcome to our captivating star catalog, where you can delve into the mysterious and astonishing world of the cosmos. Discover distant stars, explore their unique characteristics, and learn about those that may become supernovae in the near future. Join us on this thrilling journey through space and time.
            </p>
          </Col>
          <Col md={4} className="aboutimage">
            <Tilt>
              <img src={image555446} className="img-fluid" alt="aboutimage" />
            </Tilt>
          </Col>
        </Row>
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
