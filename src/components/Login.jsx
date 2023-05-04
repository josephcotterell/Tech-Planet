import React, { useState } from "react";
import {useAuth0} from '@auth0/auth0-react';

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  };

  return (
     
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />

{isAuthenticated ? (
<li>
  <button onClick={() => logout({  returnTo: window.location.origin } )}>
      Log Out
    </button>
    </li>
):(
        <li><button type="submit" onClick={() => loginWithRedirect()}>Log In</button> 
        </li>
)}
      </form>
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch("register")}
      >
        Don't have an account? Register here.
      </button>
    </div>
  );
};

export default Login