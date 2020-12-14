import React from "react";
import { Container, Button } from "react-bootstrap";

const ProfilePage = () => {
  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between">
        <h3>Profile Page</h3>
        <Button>Edit</Button>
      </div>
    </Container>
  );
};

export default ProfilePage;
