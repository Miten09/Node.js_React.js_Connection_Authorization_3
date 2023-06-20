import React from "react";

const Contact = () => {
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
      <form class="needs-validation" novalidate>
        <div class="form-row w-50" style={{ marginLeft: "25%" }}>
          <div class="col-md-4 mb-3">
            <input
              type="text"
              class="form-control"
              id="name"
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
            id="textarea"
            name="textarea"
            rows="5"
            placeholder="Enter Your Message"
          ></textarea>
        </div>

        <button
          class="btn btn-primary"
          style={{ marginLeft: "25%" }}
          type="submit"
        >
          Send Message
        </button>
      </form>
    </>
  );
};

export default Contact;
