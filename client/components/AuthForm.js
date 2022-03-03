import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { Link } from "react-router-dom";
import Banner from "./Banner";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <Banner />
      <form className="login-form" onSubmit={handleSubmit} name={name}>
        <div>
          <Link to="/login">Login</Link> / <Link to="/signup">Sign Up</Link>
        </div>
      {error && error.response && <div> {error.response.data} </div>}
        <div>
          <input
            className="input-field"
            name="username"
            type="text"
            placeholder="Username"
          />
        </div>
        {(displayName === 'Sign Up') ? <input className="input-field" name="email" type="text" placeholder="E-mail"/> : console.log('login') }
        <div>
          <input
            className="input-field"
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        <br />
        <br />
        <Link className="continue-as-guest" to="/plant-friends">
          Continue as guest   
        </Link>
      </form>
      <div className="plants-line-up">
        <img className="succulent" src="https://cdn.pixabay.com/photo/2020/10/21/04/01/succulent-5672038__340.png" />
        <img className="succulent" src="https://cdn.pixabay.com/photo/2020/10/21/04/01/succulent-5672038__340.png" />
        <img className="succulent" src="https://cdn.pixabay.com/photo/2020/10/21/04/01/succulent-5672038__340.png" />
      </div>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      // const email = evt.target.email.value
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
