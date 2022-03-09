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
        <img className="succulent" src="https://lh3.googleusercontent.com/7jngu59_wNhg-7yOfiKextYQJSng87881H65owE9ZoVKWYsMPCRdhffydAfRMmHExnDhLiTdSdOZWmGl0hlhR4mb7oQnSBIOjgJL7Q8qfUS7Q-uZqbutkfUSGYkkXFBhbEAOnGBmig=w2400" />
        <img className="succulent" src="https://lh3.googleusercontent.com/18L9skTRsW_qAjclHRlpUv8rS-4QSbl02Ag2YsiB_6jIm6aShpovghee6ZaS-oV-G3LFM9llhE-Dbw7avdGEL2dAdRrJa1Wq-49JF7f-HbTzZKgqMlNtEf1m4WYQJ5ja5EBn0NH5gQ=w2400" />
        <img className="succulent" src="https://lh3.googleusercontent.com/2HdlScAAoLPVKthLCK9cVJlQOXkHktH-y-GKCWOWKofyD9c2hztsx33BV9vI5TAc6tuWqJyDJKpl5OJ_PnU4eAjrbEfNQB24ecKLzxLtrXMyBA0o5XcCp66_9YAOSjaVaNruoFKLng=w2400" />
        <img className="succulent" src="https://lh3.googleusercontent.com/ZzEHt5fEeIXOds-yBO5_nScs_9eWjiO8pydgCRmAqEbB1LLzkgKfPNGd_qEQjnwcYA6dYI-5kUL93ymYH9XMd7QGBzDhIzv8lyzzWTpvahGQO0_wACbAVIn-l_rJOs1qkK95ZTnCdg=w2400" />
        <img className="succulent" src="https://lh3.googleusercontent.com/sknbvBSkyp2UDDkEhPzfx_mDf_DdelMxMmrqAK5AvJaY5F3i8bQqYQ7JRzRS1VdFpRIvT7GYUdnEG5sUsY_AeLbaV6_nMQLptzL2Z9bxtE_eOYLDYtLfx31E0GQ6OvFcitBtqyBDTg=w2400" />
        <img className="succulent" src="https://lh3.googleusercontent.com/gxbUFVY9dsjyarHcd7h3DH6Zs5j5IHenqbdMifhwSbQPfYFmV0v6jf55Ky33cPJWuj65ttFB5sFWOFuELtpm3rVKPGeB57EBQaWkl12l0ZlwYrY8y-B14WlZwUi33SQm3iR38fmM7Q=w2400" />
        <img className="succulent" src="https://lh3.googleusercontent.com/tm6lYdGv_D49VU5D3BSz7vmsU8OWeURb6MrhzYklgWzVtmtgoxYstJuNVT2cBJbRgFB9nQbHA_XhXEPpjq0UNEb2gnb4vKKFA3cqncklCjBOEu1s3_L4sQqzEmWqf5mMOFHwRKnEwQ=w2400" />
        <img className="succulent" src="https://lh3.googleusercontent.com/5A4XsO8ZZocjwRi0c1EqCaz8wLgbzJwdYhQwIbhMpwm-TSt-QbarS9bGV6ROOgdsrWFyHW63uMvS3zEPS5DmhZ8wkpU6kf_eeZ9WejfYDbtjLfLqAkJzttEl5hvQWrjPB3fr8aHUXw=w2400" />
        <img className="succulent" src="https://lh3.googleusercontent.com/SqBIBVk5JPDbn7PY6azbZxw9_ms1QaZHJxSD-u3tZ4U0lmiH3gjND9gbEAi5lAbQrOm1G-kSyvOV8eiwWVWuncC4nM8ymL2k5OCaXqr0YLz3VkvNpYVQGNLDX8RvzpIDHDr5APsVWA=w2400" />
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
