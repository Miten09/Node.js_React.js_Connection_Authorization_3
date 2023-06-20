import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    work: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  let name, value;

  function handleInputs(e) {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  }

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, work, phone, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        work,
        phone,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    console.log("data", data);
    console.log("res", res);

    if (res.status === 422 || !data) {
      window.alert("Invalid Credentials");
      console.log("Invalid Credentials");
    } else {
      window.alert("Registration Successfull");
      console.log("Successfull Registration");
      navigate("/login");
    }
  };

  return (
    <>
      <h3 style={{ marginBottom: "20px", marginLeft: "45%" }}>Signup</h3>
      <form
        method="POST"
        className="w-25"
        style={{ marginLeft: "35%" }}
        onSubmit={postData}
      >
        <div className="form-group">
          <label for="exampleInputEmail1">
            <i class="zmdi zmdi-account"> Name </i>
          </label>
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder="Enter name"
            name="name"
            value={user.name}
            onChange={handleInputs}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">
            <i class="zmdi zmdi-email"> Email</i>
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={user.email}
            onChange={handleInputs}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">
            <i class="zmdi zmdi-phone-in-talk"> Phone </i>
          </label>
          <input
            type="number"
            class="form-control"
            id="phone"
            placeholder="Your phone"
            name="phone"
            value={user.phone}
            onChange={handleInputs}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">
            <i class="zmdi zmdi-slideshow"> Work </i>
          </label>
          <input
            type="text"
            class="form-control"
            id="work"
            placeholder="Your Profession"
            name="work"
            value={user.work}
            onChange={handleInputs}
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
            value={user.password}
            onChange={handleInputs}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">
            <i class="zmdi zmdi-lock"> Confirm password </i>
          </label>
          <input
            type="password"
            class="form-control"
            id="cpassword"
            placeholder="Confirm Password"
            name="cpassword"
            value={user.cpassword}
            onChange={handleInputs}
          />
        </div>

        <button type="submit" class="btn btn-primary" name="signup" id="signup">
          Register
        </button>
        <div style={{ marginTop: "-30px", marginLeft: "30%" }}>
          <p>
            <NavLink to="/login">I am already registered</NavLink>
          </p>
        </div>
      </form>
    </>
  );
};

export default Signup;
