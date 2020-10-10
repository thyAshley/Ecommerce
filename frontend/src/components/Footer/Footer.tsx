import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const Footer = () => {
  return (
    <footer data-testid="footer-component">
      <Container>
        <Row>
          <Col data-testid="footer-text" className="text-center py-3">
            Copyright &copy;
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
