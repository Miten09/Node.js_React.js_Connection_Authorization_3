import React, { useEffect, useState } from "react";

const Home = () => {
  const [userName, setUserName] = useState("");
  const homePage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setUserName(data.name);
      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    homePage();
  }, []);
  return (
    <>
      <div
        style={{
          color: "green",
          display: "flex",
          justifyContent: "center",
          marginTop: "20%",
        }}
      >
        {userName ? (
          <h1>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome
            <h1 style={{ textAlign: "center" }}>
              {userName} <br /> <h3>Happy to see you Back</h3>
            </h1>
          </h1>
        ) : (
          <h1>We are MERN Developers</h1>
        )}
      </div>
    </>
  );
};

export default Home;
