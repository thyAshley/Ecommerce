import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header: React.FC = () => {
  return (
    <header data-testid="header-component">
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand data-testid="navlink-home" href="/home">
            eCommerce
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link data-testid="navlink-cart" href="/cart">
                Cart
              </Nav.Link>
              <Nav.Link data-testid="navlink-login" href="/login">
                Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
