import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, auth }) => (
  <div className="nav-bar">
    <h3 className="nav-bar-heading">
      Welcome to Terra - for all your plant friend needs
    </h3>
    <nav>
      {isLoggedIn ? (
        <div className="nav-bar-links">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to="/plant-friends">Plant Friends</Link>
          {!auth.isAdmin ? null : (
            <Link to="/users">Users</Link>
          )}
          <Link to="/cart">Cart</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="nav-bar-links">
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/plant-friends">Plant Friends</Link>
          <Link to="/guestcart">Cart</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
