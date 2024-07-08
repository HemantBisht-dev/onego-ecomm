import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTestimonial } from "../Store/ActionCreators/TestimonialActionCreators";

const Testimonial = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const TestimonialStateData = useSelector(
    (state) => state.TestimonialStateData
  );
  let options = {
    loop: true,
    margin: 10,
    autoplay: 400,
    smartspedd: 250,
    dots: false,
    navText: [
      `<button style='border:none; background-color:blue; color:white; border-radius:50%; width:50px; height:50px'>
        <i class="fa fa-arrow-left" />
      </button>`,
      `<button style='border:none; background-color:blue; color:white; border-radius:50%; width:50px; height:50px'>
        <i class="fa fa-arrow-right" />
      </button>`,
    ],
    responsiveRefreshRate: 1000,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1080: {
        items: 3,
      },
      1920: {
        items: 4,
      },
    },
  };

  function getAPIData() {
    dispatch(getTestimonial());

    if (TestimonialStateData.length) {
      setData(TestimonialStateData);
    }
  }

  useEffect(() => {
    getAPIData();
  }, [TestimonialStateData.length]);

  return (
    <>
      {/* <!-- Testimonial Start --> */}

      <div className="container-xxl py-5">
        <div className="container">
          <div
            className="text-center mx-auto wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: "600px" }}
          >
            {/* <p className="d-inline-block border rounded text-primary fw-semi-bold py-1 px-3">
              Testimonial
            </p> */}
            <h1 className="display-5 mb-5">What Our customer Say!</h1>
          </div>
          <OwlCarousel className="owl-theme" {...options} nav>
            {data.map((item, index) => {
              return (
                <div key={index} className="testimonial-item">
                  <div className="testimonial-text border rounded p-4 pt-5 mb-5">
                    <div className="btn-square bg-white border rounded-circle">
                      <i className="fa fa-quote-right fa-2x text-primary"></i>
                    </div>
                    {item.message}
                  </div>
                  <img
                    className=""
                    style={{
                      height: 100,
                      width: 100,
                      margin: "auto",
                      borderRadius: "50%",
                    }}
                    src={`img/${item.pic}`}
                    alt=""
                  />
                  <h4>{item.name}</h4>
                  <span>{`stars: ${item.star}`}</span>
                </div>
              );
            })}
          </OwlCarousel>
        </div>
      </div>
      {/* <!-- Testimonial End --> */}
    </>
  );
};

export default Testimonial;
