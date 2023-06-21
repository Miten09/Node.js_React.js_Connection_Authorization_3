import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const userLogout = async () => {
    const res = await fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data) {
      return navigate("/login");
    }

    if (res.status !== 201) {
      const error = new Error(res.error);
      throw error;
    }
  };

  useEffect(() => {
    userLogout();
  }, []);

  return (
    <>
      <div>Logout</div>
    </>
  );
};

export default Logout;
