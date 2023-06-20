import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    console.log(res);

    if (res.status === 400 || !data) {
      window.alert("Invalid credentials");
    } else {
      window.alert("Login successful");
      navigate("/");
    }
  };

  return (
    <>
      <h3 style={{ marginBottom: "20px", marginLeft: "45%" }}>Login</h3>

      <form method="POST" className="w-25 mt-3" style={{ marginLeft: "35%" }}>
        <div class="form-group">
          <label for="exampleInputEmail1">
            <i class="zmdi zmdi-email"> Your Email</i>
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label for="exampleInputPassword1">
            <i class="zmdi zmdi-lock"> Your password </i>
          </label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Your Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          class="btn btn-primary"
          name="signin"
          id="signin"
          onClick={loginUser}
        >
          Log In
        </button>
        <div style={{ marginTop: "-30px", marginLeft: "30%" }}>
          <p>
            <NavLink to="/signup">Create an account</NavLink>
          </p>
        </div>
      </form>
    </>
  );
};

export default Login;
