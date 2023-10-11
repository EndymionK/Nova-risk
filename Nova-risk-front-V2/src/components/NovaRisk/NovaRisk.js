import React from "react";
import Particle from "../Particle";
import { Container, Row, Col } from "react-bootstrap";

function NovaRisk() {
    return (
        <section>
            <Container fluid className="home-section" id="home">
                <Particle />
                <Container className="home-content">
                    <Row>
                        <Col md={7} className="home-header">
                            <h1 style={{ paddingBottom: 15 }} className="heading">
                                Nova Risk Animation Test!{" "}
                                <span className="wave" role="img" aria-labelledby="wave">
                                    ✨
                                </span>
                            </h1>

                            <h1 className="heading-name">
                                Animation
                                <strong className="main-name"> Test </strong>
                            </h1>

                            <div style={{ padding: 50, textAlign: "left" }}>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </section>
    );
}

export default NovaRisk
        