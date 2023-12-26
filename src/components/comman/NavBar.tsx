import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import logo from "../../assets/image/logo.svg";

function NavBar() {
  return (
    <>
      <Navbar expand="md" variant="dark">
        <Container>
          <Link to="/">
            <Navbar.Brand href="#home">
              <img src={logo} alt="logo" />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav " />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto text-light">
              <Link
                to="/movie"
                className="text-decoration-none mx-md-3   text-light"
              >
                Movies
              </Link>
              <Link to="/tv" className="text-decoration-none text-light">
                TV shows
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
