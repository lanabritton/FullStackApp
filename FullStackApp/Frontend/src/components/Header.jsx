import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faBars, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container> 
          <Link to="/" className="navbar-brand">DFCorp</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                <FontAwesomeIcon icon={faHome} /> Home
              </Nav.Link>
              <Nav.Link as={Link} to="/favourite-places">
                <FontAwesomeIcon icon={faHeart} /> Favourite Places
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                <FontAwesomeIcon icon={faSignInAlt} /> Sign In
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto d-lg-none">
              <Nav.Link href="#menu">
                <FontAwesomeIcon icon={faBars} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
