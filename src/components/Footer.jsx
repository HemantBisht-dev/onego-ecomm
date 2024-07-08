import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addNewsletter,
  getNewsletter,
} from "../Store/ActionCreators/NewsletterActionCreators";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const NewsletterStateData = useSelector((state) => state.NewsletterStateData);

  function postData(e) {
    e.preventDefault();
    if (email.length === 0) {
      setMessage("Please enter valid email");
    } else if (NewsletterStateData.find((x) => x.email === email)) {
      setMessage("Your Email Address is Already Registered With Us");
    } else {
      dispatch(addNewsletter({ email: email }));
      setMessage("Thanks to Subscribe our Newsletter Services");
      setEmail("");
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getNewsletter());
    })();
  }, [NewsletterStateData.length]);

  return (
    <>
      {/* <!-- Footer Start --> */}
      <div
        className="container-fluid bg-dark text-light footer mt-5 py-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-4">Address</h4>
              <p className="mb-2">
                <i className="fa fa-map-marker me-3"></i>Dehradun,Uk
              </p>
              <p className="mb-2">
                <i className="fa fa-phone me-3"></i>
                <a
                  className="text-light"
                  href="tel:+95863256695"
                  target="_blank"
                  rel="noreferrer"
                >
                  +91-95863256695
                </a>
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3"></i>
                <a
                  className="text-light"
                  href="mailto:hmntmessi2210@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  hmntmessi2210@gmail.com
                </a>
              </p>
              <div className="d-flex pt-2">
                <a
                  className="btn btn-square btn-outline-light rounded-circle me-2"
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  className="btn btn-square btn-outline-light rounded-circle me-2"
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  className="btn btn-square btn-outline-light rounded-circle me-2"
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-youtube"></i>
                </a>
                <a
                  className="btn btn-square btn-outline-light rounded-circle me-2"
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-4">Quick Links</h4>
              <Link className="btn btn-link" to="/">
                Home
              </Link>
              <Link className="btn btn-link" to="/about">
                About
              </Link>
              <Link className="btn btn-link" to="/shop">
                Shop
              </Link>
              <Link className="btn btn-link" to="/contactus">
                Contact Us
              </Link>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-4">Policies</h4>
              <Link className="btn btn-link" to="#">
                Privacy Policy
              </Link>
              <Link className="btn btn-link" to="#">
                Refund Policy
              </Link>
              <Link className="btn btn-link" to="#">
                Terms & Condition
              </Link>
              <Link className="btn btn-link" to="#">
                FAQ
              </Link>
            </div>
            <div className="col-lg-3 col-md-6">
              <h4 className="text-white mb-4">Newsletter</h4>
              <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
              <p>{message}</p>
              <div className="position-relative w-100">
                <form onSubmit={postData}>
                  <input
                    name="email"
                    value={email}
                    className="form-control bg-white border-0 w-100 py-3 ps-4 pe-5"
                    type="text"
                    placeholder="Your email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                  >
                    SignUp
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Footer End --> */}
    </>
  );
};

export default Footer;
