import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Header: React.FC = () => {
  return (
    <header data-testid="header-component">
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer data-testid="navlink-home" to="/">
            <Navbar.Brand href="/">eCommerce</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer data-testid="navlink-cart" to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart px-1" />
                  Cart
                </Nav.Link>
              </LinkContainer>
              <LinkContainer data-testid="navlink-login" to="/login">
                <Nav.Link data-testid="navlink-login" href="/login">
                  <i className="fas fa-user px-1" />
                  Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
