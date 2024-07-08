import { useState } from "react";
import { useDispatch } from "react-redux";
import Breadcrum from "./Breadcrum";
import formValidations from "./Validation/formValidations";
import { addContactus } from "../Store/ActionCreators/ContactusActionCreators";

const Contactus = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    name: "Name field is required",
    phone: "Phone field is required",
    email: "Email field is required",
    subject: "Subject field is required",
    message: "Message field is required",
  });

  const dispatch = useDispatch();

  function getInputData(e) {
    let { name, value } = e.target;
    setErrorMessage((old) => {
      return {
        ...old,
        [name]: formValidations(e),
      };
    });
    setData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }

  function postData(e) {
    e.preventDefault();
    let error = Object.values(errorMessage).find((x) => x.length !== 0);
    if (!error) {
      let item = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        subject: data.subject,
        message: data.message,
        active: true,
        date: new Date(),
      };
      dispatch(addContactus(item));
      setMessage(
        "Thanks to share your query with us! Our Team will contact with you soon"
      );
      setData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
    } else {
      setShow(true);
    }
  }
  return (
    <>
      <Breadcrum title="Contact" />

      {/* <!-- Contact Start --> */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <p className="d-inline-block border rounded text-primary fw-semi-bold py-1 px-3">
                Contact
              </p>
              <h1 className="display-5 mb-4">
                If You Have Any Query, Please Contact Us
              </h1>
              <p className="mb-4">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde
                molestias maxime blanditiis, laudantium, nobis ex praesentium
                exercitationem vel et voluptatum tenetur, cupiditate ullam
                excepturi nihil. Dolor obcaecati sequi maxime omnis?
              </p>
              {show ? <p className="text-success">{message}</p> : ""}
              <form onSubmit={postData}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={data.name}
                        onChange={getInputData}
                        placeholder="Your Name"
                      />
                      <label htmlFor="name">Your Name</label>
                      {show ? (
                        <p className="text-danger">{errorMessage.name}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        name="phone"
                        value={data.phone}
                        onChange={getInputData}
                        placeholder="Your Phone Number"
                      />
                      <label htmlFor="name">Phone no.</label>
                      {show ? (
                        <p className="text-danger">{errorMessage.phone}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={data.email}
                        onChange={getInputData}
                        placeholder="Your Email"
                      />
                      <label htmlFor="email">Your Email</label>
                      {show ? (
                        <p className="text-danger">{errorMessage.email}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        value={data.subject}
                        onChange={getInputData}
                        placeholder="Subject"
                      />
                      <label htmlFor="subject">Subject</label>
                      {show ? (
                        <p className="text-danger">{errorMessage.subject}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Leave a message here"
                        name="message"
                        value={data.message}
                        onChange={getInputData}
                        style={{ height: "100px" }}
                      ></textarea>
                      <label htmlFor="message">Message</label>
                      {show ? (
                        <p className="text-danger">{errorMessage.message}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary py-3 px-5" type="submit">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div
              className="col-lg-6 wow fadeIn"
              data-wow-delay="0.5s"
              style={{ minHeight: "450px" }}
            >
              <div className="position-relative rounded overflow-hidden h-100">
                <div className="mapouter">
                  <div className="gmap_canvas">
                    <iframe
                      width="600"
                      height="500"
                      id="gmap_canvas"
                      src="https://maps.google.com/maps?q=India%20gate%20delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight="0"
                      marginWidth="0"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Contact End --> */}
    </>
  );
};

export default Contactus;
