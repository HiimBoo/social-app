import React from "react";
import { Nav } from "react-bootstrap";

const SideMenu = () => {
  return (
    <Nav defaultActiveKey="/home" className="flex-column bg-light height">
      <Nav.Link href="/admin/profile">Profile</Nav.Link>
      <Nav.Link href="/admin/blogs">Blog</Nav.Link>
      <Nav.Link href="/admin/friends">Friends</Nav.Link>
      <Nav.Link href="/admin/messenger">Messenger</Nav.Link>
    </Nav>
  );
};

export default SideMenu;
