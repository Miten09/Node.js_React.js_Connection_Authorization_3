import React, { useEffect, useState } from "react";

const Contact = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const userContact = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  //Send data to backend

  const contactForm = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;
    const res = await fetch("/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (res.status !== 201) {
      window.alert("plzzz fill all the fields");
    } else {
      window.alert("Message Sent Successfully");
      setUserData({ ...userData, message: "" });
    }
  };

  return (
    <>
      <div class="container text-center">
        <div class="row p-3">
          <div class="col-sm shadow-sm p-3 mb-5 bg-white rounded">
            <b>Phone</b>
            <br />
            9674657465
          </div>
          <div class="col-sm shadow-sm p-3 mb-5 bg-white rounded">
            <b>Email</b> <br />
            miten@gmail.com
          </div>
          <div class="col-sm shadow-sm p-3 mb-5 bg-white rounded">
            <b>
              Address
              <br />
            </b>
            Gujarat,India
          </div>
        </div>
      </div>
      <h3 style={{ marginLeft: "25%", marginBottom: "30px" }}>Get in touch</h3>
      <form method="POST" class="needs-validation" novalidate>
        <div class="form-row w-50" style={{ marginLeft: "25%" }}>
          <div class="col-md-4 mb-3">
            <input
              type="text"
              class="form-control"
              id="name"
              value={userData.name}
              onChange={handleInputs}
              name="name"
              placeholder="Your name"
              required
            />
          </div>
          <div class="col-md-4 mb-3">
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputs}
              placeholder="Your Email"
              required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="input-group">
              <div class="input-group-prepend"></div>
              <input
                type="Number"
                class="form-control"
                id="phone"
                name="phone"
                value={userData.phone}
                onChange={handleInputs}
                placeholder="Your Phone Number"
                aria-describedby="inputGroupPrepend"
                required
              />
            </div>
          </div>
        </div>
        <div
          class="form-group w-50"
          style={{ marginLeft: "25%", marginTop: "10px" }}
        >
          <textarea
            class="form-control"
            id="message"
            name="message"
            rows="5"
            value={userData.message}
            onChange={handleInputs}
            placeholder="Enter Your Message"
          ></textarea>
        </div>

        <button
          class="btn btn-primary"
          style={{ marginLeft: "25%" }}
          type="submit"
          onClick={contactForm}
        >
          Send Message
        </button>
      </form>
    </>
  );
};

export default Contact;
