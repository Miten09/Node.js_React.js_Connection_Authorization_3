import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };
  useEffect(() => {
    callAboutPage();
  }, []);
  return (
    <>
      <div>
        <form method="GET">
          <div className="row">
            <div className="col-md-6" style={{ marginLeft: "35%" }}>
              <h5>Miten </h5>
              <h5>Web developer </h5>
              <ul className="nav" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                  >
                    About
                  </a>
                </li>
                <button
                  type="button"
                  class="btn btn-success"
                  name="btnAddMore"
                  style={{ marginLeft: "30%" }}
                >
                  Edit Profile
                </button>
                <div className="col-md-2 ml-5"></div>
              </ul>
            </div>
          </div>
          <div className="row" style={{ marginLeft: "20%" }}>
            <div className="col-md-8 pl-5">
              <div id="myTabContent">
                <div id="home" role="tabpanel">
                  <div
                    className="row"
                    style={{ textAlign: "center", marginTop: "5%" }}
                  >
                    <div className="col-md-6">
                      <label>USER ID</label>
                    </div>
                    <div className="col-md-6 ">
                      <p>857475746580</p>
                    </div>
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6 ">
                      <p>Miten</p>
                    </div>
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6 ">
                      <p>miten@gmail.com</p>
                    </div>
                    <div className="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6 ">
                      <p>99874132563</p>
                    </div>
                    <div className="col-md-6">
                      <label>Profession</label>
                    </div>
                    <div className="col-md-6 ">
                      <p>Web developer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
