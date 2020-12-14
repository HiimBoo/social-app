import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../images/logo.svg";
// import githubIco from "../images/github_icon.png";
import { Link } from "react-router-dom";
import authActions from "../redux/actions/auth.actions";
import { useDispatch, useSelector } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PublicNavbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const authLinks = (
    <Nav>
      <Nav.Link as={Link} to="/admin/profile">
        Admin
      </Nav.Link>
      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
    </Nav>
  );

  const publicLinks = (
    <Nav>
      <Nav.Link as={Link} to="/register">
        Register
      </Nav.Link>
      <Nav.Link as={Link} to="/login">
        Login
      </Nav.Link>
    </Nav>
  );

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/" className="mr-auto">
          <img src={logo} alt="CoderSchool" width="200px" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          {!loading && <>{isAuthenticated ? authLinks : publicLinks}</>}
        </Navbar.Collapse>
      </Navbar>

      {/* <Navbar bg="light" expand="lg">
        <Navbar.Brand as={NavLink} to="/">
          <img src={logo} alt="CoderSchool" width="200px" />
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/login">
            Login
          </Nav.Link>
          <Nav.Link as={NavLink} to="/register">
            Register
          </Nav.Link>
        </Nav>
        <Nav>
          <a
            href="https://github.com/dhminh1024/cheetah_demo_code/tree/master/week6/social-blog-fe"
            target="_blank"
          >
            <img src={githubIco} alt="Github" width="32px" />
          </a>
        </Nav>
      </Navbar> */}
    </>
  );
};

export default PublicNavbar;
