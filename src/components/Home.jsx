import { useEffect, useState } from "react";
import Testimonial from "./Testimonial";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductSlider from "./ProductSlider";
import { getProduct } from "../Store/ActionCreators/ProductActionCreators";
import ProductItem from "./ProductItem";

const Home = () => {
  const [products, setProducts] = useState([]);
  let dispatch = useDispatch();
  let ProductStateData = useSelector((state) => state.ProductStateData);

  function getAPIData() {
    dispatch(getProduct());

    if (ProductStateData.length) {
      setProducts(ProductStateData);
    }
  }

  useEffect(() => {
    getAPIData();
  }, [ProductStateData.length]);
  return (
    <>
      {/* <!-- Carousel Start --> */}
      <div
        className="container-fluid p-0 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div
          id="header-carousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="w-100"
                src="img/men fashion collection.jpg"
                alt="Image"
                style={{ height: 700 }}
              />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row justify-content-start">
                    <div className="col-lg-8">
                      <p className="d-inline-block border border-dark rounded text-primary fw-semi-bold py-1 px-3 animated slideInDown">
                        Welcome to OneGo
                      </p>
                      <h1 className="display-1 mb-4 animated slideInDown">
                        Male Fashion Collection
                      </h1>
                      <Link
                        to="/shop?&mc=Men"
                        className="btn btn-primary py-3 px-5 animated slideInDown"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img
                className="w-100"
                src="img/women fashion collection.jpg"
                alt="Image"
                style={{ height: 700 }}
              />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row justify-content-start">
                    <div className="col-lg-7">
                      <p className="d-inline-block border border-dark rounded text-primary fw-semi-bold py-1 px-3 animated slideInDown">
                        Welcome to OneGo
                      </p>
                      <h1 className="display-1 mb-4 animated slideInDown">
                        Female Fashion Collection
                      </h1>
                      <Link
                        to="/shop?&mc=Women"
                        className="btn btn-primary py-3 px-5 animated slideInDown"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img
                className="w-100"
                src="img/kids fashion collection.jpg"
                alt="Image"
                style={{ height: 700 }}
              />
              <div className="carousel-caption">
                <div className="container">
                  <div className="row justify-content-start">
                    <div className="col-lg-7">
                      <p className="d-inline-block border border-dark rounded text-primary fw-semi-bold py-1 px-3 animated slideInDown">
                        Welcome to OneGo
                      </p>
                      <h1 className="display-1 mb-4 animated slideInDown">
                        Kids Fashion Collection
                      </h1>
                      <Link
                        to="/shop?&mc=Kids"
                        className="btn btn-primary py-3 px-5 animated slideInDown"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* <!-- Carousel End --> */}

      {/* <!-- Help customer Start --> */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-4 align-items-end mb-4">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <img
                className="img-fluid rounded"
                src="img/shipping.jpeg"
                style={{ height: 450, width: "100%" }}
              />
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
              <h1 className="display-5 mb-4">
                We Help Our Customer in case of Return, Refund
              </h1>
              <p className="mb-4">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </p>
              <div className="border rounded p-4">
                <nav>
                  <div
                    className="nav nav-tabs mb-3"
                    id="nav-tab"
                    role="tablist"
                  >
                    <button
                      className="nav-link fw-semi-bold active"
                      id="nav-story-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-story"
                      type="button"
                      role="tab"
                      aria-controls="nav-story"
                      aria-selected="true"
                    >
                      Refund
                    </button>
                    <button
                      className="nav-link fw-semi-bold"
                      id="nav-mission-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-mission"
                      type="button"
                      role="tab"
                      aria-controls="nav-mission"
                      aria-selected="false"
                    >
                      Return
                    </button>
                    <button
                      className="nav-link fw-semi-bold"
                      id="nav-vision-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-vision"
                      type="button"
                      role="tab"
                      aria-controls="nav-vision"
                      aria-selected="false"
                    >
                      Shipping
                    </button>
                  </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-story"
                    role="tabpanel"
                    aria-labelledby="nav-story-tab"
                  >
                    <p>
                      Tempor erat elitr rebum at clita. Diam dolor diam ipsum et
                      tempor sit. Aliqu diam amet diam et eos labore.
                    </p>
                    <p className="mb-0">
                      Diam dolor diam ipsum et tempor sit. Aliqu diam amet diam
                      et eos labore. Clita erat ipsum et lorem et sit
                    </p>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-mission"
                    role="tabpanel"
                    aria-labelledby="nav-mission-tab"
                  >
                    <p>
                      Tempor erat elitr rebum at clita. Diam dolor diam ipsum et
                      tempor sit. Aliqu diam amet diam et eos labore.
                    </p>
                    <p className="mb-0">
                      Diam dolor diam ipsum et tempor sit. Aliqu diam amet diam
                      et eos labore. Clita erat ipsum et lorem et sit
                    </p>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-vision"
                    role="tabpanel"
                    aria-labelledby="nav-vision-tab"
                  >
                    <p>
                      Tempor erat elitr rebum at clita. Diam dolor diam ipsum et
                      tempor sit. Aliqu diam amet diam et eos labore.
                    </p>
                    <p className="mb-0">
                      Diam dolor diam ipsum et tempor sit. Aliqu diam amet diam
                      et eos labore. Clita erat ipsum et lorem et sit
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="border rounded p-4 wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <div className="row g-4">
              <div className="col-lg-4 wow fadeIn" data-wow-delay="0.1s">
                <div className="h-100">
                  <div className="d-flex">
                    <div className="flex-shrink-0 btn-lg-square rounded-circle bg-primary">
                      <i className="fa fa-times text-white"></i>
                    </div>
                    <div className="ps-3">
                      <h4>100% Original Products</h4>
                      <span>Clita erat ipsum lorem sit sed stet duo justo</span>
                    </div>
                    <div className="border-end d-none d-lg-block"></div>
                  </div>
                  <div className="border-bottom mt-4 d-block d-lg-none"></div>
                </div>
              </div>
              <div className="col-lg-4 wow fadeIn" data-wow-delay="0.3s">
                <div className="h-100">
                  <div className="d-flex">
                    <div className="flex-shrink-0 btn-lg-square rounded-circle bg-primary">
                      <i className="fa fa-users text-white"></i>
                    </div>
                    <div className="ps-3">
                      <h4>Free shipping Available</h4>
                      <span>Free shipping on purchase above 500</span>
                    </div>
                    <div className="border-end d-none d-lg-block"></div>
                  </div>
                  <div className="border-bottom mt-4 d-block d-lg-none"></div>
                </div>
              </div>
              <div className="col-lg-4 wow fadeIn" data-wow-delay="0.5s">
                <div className="h-100">
                  <div className="d-flex">
                    <div className="flex-shrink-0 btn-lg-square rounded-circle bg-primary">
                      <i className="fa fa-phone text-white"></i>
                    </div>
                    <div className="ps-3">
                      <h4>24/7 Customer Support</h4>
                      <span>Clita erat ipsum lorem sit sed stet duo justo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Help customer End --> */}

      {/* <!-- Products Start --> */}
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "600px" }}
          >
            {/* <p className="d-inline-block border rounded text-primary fw-semi-bold py-1 px-3">
              Our Projects
            </p> */}
            <h1 className="display-5 mb-5">Latest Male Products</h1>
          </div>
          <ProductSlider
            data={products.filter((x) => x.maincategory === "Men")}
          ></ProductSlider>
        </div>
      </div>
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "600px" }}
          >
            {/* <p className="d-inline-block border rounded text-primary fw-semi-bold py-1 px-3">
              Our Projects
            </p> */}
            <h1 className="display-5 mb-5">Latest Female Products</h1>
          </div>
          <ProductSlider
            data={products.filter((x) => x.maincategory === "Women")}
          ></ProductSlider>
        </div>
      </div>
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "600px" }}
          >
            {/* <p className="d-inline-block border rounded text-primary fw-semi-bold py-1 px-3">
              Our Projects
            </p> */}
            <h1 className="display-5 mb-5">Latest Kids Products</h1>
          </div>
          <ProductSlider
            data={products.filter((x) => x.maincategory === "Kids")}
          ></ProductSlider>
        </div>
      </div>
      {/* <!-- products End --> */}

      {/* <!-- Facts Start --> */}
      <div className="container-fluid facts my-5 py-5">
        <div className="container py-5">
          <div className="row g-5">
            <div
              className="col-sm-6 col-lg-3 text-center wow fadeIn"
              data-wow-delay="0.1s"
            >
              <i className="fa fa-users fa-3x text-white mb-3"></i>
              <h1 className="display-4 text-white" data-toggle="counter-up">
                1234
              </h1>
              <span className="fs-5 text-white">Happy Clients</span>
              <hr className="bg-white w-25 mx-auto mb-0" />
            </div>
            <div
              className="col-sm-6 col-lg-3 text-center wow fadeIn"
              data-wow-delay="0.3s"
            >
              <i className="fa fa-check fa-3x text-white mb-3"></i>
              <h1 className="display-4 text-white" data-toggle="counter-up">
                1234
              </h1>
              <span className="fs-5 text-white">Projects Completed</span>
              <hr className="bg-white w-25 mx-auto mb-0" />
            </div>
            <div
              className="col-sm-6 col-lg-3 text-center wow fadeIn"
              data-wow-delay="0.5s"
            >
              <i className="fa fa-thumbs-up fa-3x text-white mb-3"></i>
              <h1 className="display-4 text-white" data-toggle="counter-up">
                1234
              </h1>
              <span className="fs-5 text-white">Dedicated Staff</span>
              <hr className="bg-white w-25 mx-auto mb-0" />
            </div>
            <div
              className="col-sm-6 col-lg-3 text-center wow fadeIn"
              data-wow-delay="0.7s"
            >
              <i className="fa fa-star fa-3x text-white mb-3"></i>
              <h1 className="display-4 text-white" data-toggle="counter-up">
                1234
              </h1>
              <span className="fs-5 text-white">Awards Achieved</span>
              <hr className="bg-white w-25 mx-auto mb-0" />
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Facts End --> */}

      {/* <!-- Features Start --> */}
      <div className="container-xxl feature py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <p className="d-inline-block border rounded text-primary fw-semi-bold py-1 px-3">
                Why Choosing Us!
              </p>
              <h1 className="display-5 mb-4">
                Few Reasons Why People Choosing Us!
              </h1>
              <p className="mb-4">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </p>
              <Link className="btn btn-primary py-3 px-5" to="/shop">
                Shop Now
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="row g-4 align-items-center">
                <div className="col-md-6">
                  <div className="row g-4">
                    <div className="col-12 wow fadeIn" data-wow-delay="0.3s">
                      <div className="feature-box border rounded p-4">
                        <i className="fa fa-check fa-3x text-primary mb-3"></i>
                        <h4 className="mb-3">Male Products</h4>
                        <p className="mb-3">
                          Clita erat ipsum et lorem et sit, sed stet lorem sit
                          clita duo justo erat amet
                        </p>
                        <Link className="fw-semi-bold" to="/shop/male">
                          Shop Now <i className="fa fa-arrow-right ms-1"></i>
                        </Link>
                      </div>
                    </div>
                    <div className="col-12 wow fadeIn" data-wow-delay="0.5s">
                      <div className="feature-box border rounded p-4">
                        <i className="fa fa-check fa-3x text-primary mb-3"></i>
                        <h4 className="mb-3">Female Products</h4>
                        <p className="mb-3">
                          Clita erat ipsum et lorem et sit, sed stet lorem sit
                          clita duo justo erat amet
                        </p>
                        <Link className="fw-semi-bold" to="/shop/female">
                          Shop Now <i className="fa fa-arrow-right ms-1"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 wow fadeIn" data-wow-delay="0.7s">
                  <div className="feature-box border rounded p-4">
                    <i className="fa fa-check fa-3x text-primary mb-3"></i>
                    <h4 className="mb-3">Kids Products</h4>
                    <p className="mb-3">
                      Clita erat ipsum et lorem et sit, sed stet lorem sit clita
                      duo justo erat amet
                    </p>
                    <Link className="fw-semi-bold" to="/shop/kids">
                      shop Now <i className="fa fa-arrow-right ms-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Features End --> */}

      {/* <!-- our Latest Products --> */}
      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "600px" }}
          >
            {/* <p className="d-inline-block border rounded text-primary fw-semi-bold py-1 px-3">
              Our Team
            </p> */}
            <h1 className="display-5 mb-5">Our Latest Products</h1>
          </div>
          <div className="row g-4">
            {products.slice(0, 20).map((item, index) => {
              return (
                <div key={index} className="col-xxl-3 col-lg-4 col-md-6 col-12">
                  <ProductItem item={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* <!-- About us--> */}
      <div className="container-xxl service py-5">
        <div className="container">
          <div
            className="text-center mx-auto wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "600px" }}
          >
            <p className="d-inline-block border rounded text-primary fw-semi-bold py-1 px-3">
              About Us
            </p>
            <h1 className="display-5 mb-5">
              Awesome E-commerce Platform for cloths
            </h1>
          </div>
          <div className="row g-4 wow fadeInUp" data-wow-delay="0.3s">
            <div className="col-lg-4">
              <div className="nav nav-pills d-flex justify-content-between w-100 h-100 me-4">
                <button
                  className="nav-link w-100 d-flex align-items-center text-start border p-4 mb-4 active"
                  data-bs-toggle="pill"
                  data-bs-target="#tab-pane-1"
                  type="button"
                >
                  <h5 className="m-0">
                    <i className="fa fa-bars text-primary me-3"></i>100%
                    Original Products
                  </h5>
                </button>
                <button
                  className="nav-link w-100 d-flex align-items-center text-start border p-4 mb-4"
                  data-bs-toggle="pill"
                  data-bs-target="#tab-pane-2"
                  type="button"
                >
                  <h5 className="m-0">
                    <i className="fa fa-bars text-primary me-3"></i>Top Products
                  </h5>
                </button>
                <button
                  className="nav-link w-100 d-flex align-items-center text-start border p-4 mb-4"
                  data-bs-toggle="pill"
                  data-bs-target="#tab-pane-3"
                  type="button"
                >
                  <h5 className="m-0">
                    <i className="fa fa-bars text-primary me-3"></i>Great Deals
                    on Cloths
                  </h5>
                </button>
                <button
                  className="nav-link w-100 d-flex align-items-center text-start border p-4 mb-0"
                  data-bs-toggle="pill"
                  data-bs-target="#tab-pane-4"
                  type="button"
                >
                  <h5 className="m-0">
                    <i className="fa fa-bars text-primary me-3"></i>7 Days
                    Refund Policy
                  </h5>
                </button>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="tab-content w-100">
                <div className="tab-pane fade show active" id="tab-pane-1">
                  <div className="row g-4">
                    <div className="col-md-6" style={{ minHeight: "350px" }}>
                      <div className="position-relative h-100">
                        <img
                          className="position-absolute rounded w-100 h-100"
                          src="img/service-1.jpg"
                          style={{ objectFit: "cover" }}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h3 className="mb-4">
                        25 Years Of Experience In Financial Support
                      </h3>
                      <p className="mb-4">
                        Tempor erat elitr rebum at clita. Diam dolor diam ipsum
                        sit. Aliqu diam amet diam et eos. Clita erat ipsum et
                        lorem et sit, sed stet lorem sit clita duo justo erat
                        amet.
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>Secured
                        Loans
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>Credit
                        Facilities
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>Cash
                        Advanced
                      </p>
                      <Link
                        to="/shop"
                        className="btn btn-primary py-3 px-5 mt-3"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="tab-pane-2">
                  <div className="row g-4">
                    <div className="col-md-6" style={{ minHeight: "350px" }}>
                      <div className="position-relative h-100">
                        <img
                          className="position-absolute rounded w-100 h-100"
                          src="img/service-2.jpg"
                          style={{ objectFit: "cover" }}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h3 className="mb-4">
                        25 Years Of Experience In Financial Support
                      </h3>
                      <p className="mb-4">
                        Tempor erat elitr rebum at clita. Diam dolor diam ipsum
                        sit. Aliqu diam amet diam et eos. Clita erat ipsum et
                        lorem et sit, sed stet lorem sit clita duo justo erat
                        amet.
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>Secured
                        Loans
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>Credit
                        Facilities
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>Cash
                        Advanced
                      </p>
                      <Link
                        to="/shop"
                        className="btn btn-primary py-3 px-5 mt-3"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="tab-pane-3">
                  <div className="row g-4">
                    <div className="col-md-6" style={{ minHeight: "350px" }}>
                      <div className="position-relative h-100">
                        <img
                          className="position-absolute rounded w-100 h-100"
                          src="img/service-3.jpg"
                          style={{ objectFit: "cover" }}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h3 className="mb-4">
                        25 Years Of Experience In Financial Support
                      </h3>
                      <p className="mb-4">
                        Tempor erat elitr rebum at clita. Diam dolor diam ipsum
                        sit. Aliqu diam amet diam et eos. Clita erat ipsum et
                        lorem et sit, sed stet lorem sit clita duo justo erat
                        amet.
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>Secured
                        Loans
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>Credit
                        Facilities
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>Cash
                        Advanced
                      </p>
                      <Link
                        to="/shop"
                        className="btn btn-primary py-3 px-5 mt-3"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="tab-pane-4">
                  <div className="row g-4">
                    <div className="col-md-6" style={{ minHeight: "350px" }}>
                      <div className="position-relative h-100">
                        <img
                          className="position-absolute rounded w-100 h-100"
                          src="img/service-4.jpg"
                          style={{ objectFit: "cover" }}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h3 className="mb-4">
                        25 Years Of Experience In Financial Support
                      </h3>
                      <p className="mb-4">
                        Tempor erat elitr rebum at clita. Diam dolor diam ipsum
                        sit. Aliqu diam amet diam et eos. Clita erat ipsum et
                        lorem et sit, sed stet lorem sit clita duo justo erat
                        amet.
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>Secured
                        Loans
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>Credit
                        Facilities
                      </p>
                      <p>
                        <i className="fa fa-check text-primary me-3"></i>Cash
                        Advanced
                      </p>
                      <Link
                        to="/shop"
                        className="btn btn-primary py-3 px-5 mt-3"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- About us --> */}

      {/* <!-- Callback Start --> */}
      <div className="container-fluid callback my-5 pt-5">
        <div className="container pt-5">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div
                className="bg-white border rounded p-4 p-sm-5 wow fadeInUp"
                data-wow-delay="0.5s"
              >
                <div
                  className="text-center mx-auto wow fadeInUp"
                  data-wow-delay="0.1s"
                  style={{ maxWidth: "600px" }}
                >
                  <p className="d-inline-block border rounded text-primary fw-semi-bold py-1 px-3">
                    Get In Touch
                  </p>
                  <h1 className="display-5 mb-5">Request A Call-Back</h1>
                </div>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="mail"
                        placeholder="Your Email"
                      />
                      <label htmlFor="mail">Your Email</label>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="mobile"
                        placeholder="Your Mobile"
                      />
                      <label htmlFor="mobile">Your Mobile</label>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        placeholder="Subject"
                      />
                      <label htmlFor="subject">Subject</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Leave a message here"
                        id="message"
                        style={{ height: "100px" }}
                      ></textarea>
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  <div className="col-12 text-center">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Submit Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Callback End --> */}

      <Testimonial />

      {/* <!-- Team End --> */}
    </>
  );
};

export default Home;
