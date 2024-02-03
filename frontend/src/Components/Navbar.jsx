import React from "react";
import { Navbar, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function MyNavbar() {
  const navigate = useNavigate();
  const userName = useSelector((state) => state.user.userInfo);
  const handleLogout = () => {
    localStorage.removeItem("Token");
    navigate("/login");
  };

  return (
    <Navbar
      style={{ borderBottom: "1px solid black" }}
      bg="light"
      expand="lg"
      className="justify-content-between px-3" // Changed to justify-content-between
    >
      <span className="navbar-text">
        <strong>{userName}</strong>
      </span>

      <Button variant="outline-danger" onClick={handleLogout}>
        Logout
      </Button>
    </Navbar>
  );
}

export default MyNavbar;
