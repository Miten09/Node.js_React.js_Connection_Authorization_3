import React from "react";
import { NavLink } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <>
      <div id="notFound">
        <div style={{ textAlign: "center", marginTop: "15%", color: "blue" }}>
          <h1>404 Not Found</h1>
          <h2>We are Sorry, page Not found</h2>
        </div>
        <button
          type="button"
          class="btn btn-success"
          style={{ marginLeft: "43%", marginTop: "30px" }}
        >
          <NavLink style={{ color: "white" }} to="/">
            Back to Home Page
          </NavLink>
        </button>
      </div>
    </>
  );
};
