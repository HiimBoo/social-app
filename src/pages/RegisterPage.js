import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import authActions from "../redux/actions/auth.actions";
import routeActions from "../redux/actions/route.actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    avatarUrl: "",
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const redirectTo = useSelector((state) => state.route.redirectTo);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(JSON.stringify(formData));
    const { password, password2 } = formData;
    if (password !== password2) {
      toast.error("Password do not mathch");
    }
    dispatch(authActions.registerAccount(formData));
  };

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      dispatch(routeActions.removeRedirectTo());
    }
  }, [history, redirectTo, dispatch]);

  return (
    <Container>
      <Row>
        <Col>
          <p>Sign Up</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                name="avatarUrl"
                placeholder="Your avatar"
                value={formData.avatarUrl}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="email"
                placeholder="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                name="password2"
                placeholder="Confirm your password"
                value={formData.password2}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit">Register</Button>
          </Form>
          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
