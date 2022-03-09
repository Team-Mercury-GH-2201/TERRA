import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import { createUser } from "../store/users";


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
      {error && error.response && <div style={{color: "red"}}> {error.response.data} </div>}
        <div>
          <input
            className="input-field"
            name="username"
            type="text"
            placeholder="Username"
          />
        </div>
        {(displayName === 'Sign Up') ? <input className="input-field" name="email" type="text" placeholder="E-mail"/> : null }
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
        <img className="succulent" src="https://lh3.googleusercontent.com/nISWGsdZS-fb9ojERbm8zwCz00D9MfpssT3QQC8DhXIb-6pauLCE5yoZ3T2oKhqkLl5E9cN-WvFOKJG_N9J35xTzzV-eSv6ss2PT-fH3a6Il9FHIYNS6nzi_fi86BQpNClJnMsbRCQ=w2400" />
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
    error: state.users,
  };
};

const mapDispatchLogin = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

const mapDispatchSignup = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      const email = evt.target.email.value;
      dispatch(createUser({username: username, email: email, password: password}));
    },
  };
};

export const Login = connect(mapLogin, mapDispatchLogin)(AuthForm);
export const Signup = connect(mapSignup, mapDispatchSignup)(AuthForm);
