import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Breadcrum from "../../Breadcrum";
import Sidebar from "../Sidebar";
import formValidations from "../../Validation/formValidations";

import { useDispatch, useSelector } from "react-redux";

import {
  addTestimonial,
  getTestimonial,
} from "../../../Store/ActionCreators/TestimonialActionCreators";

const CreateTestimonial = () => {
  const [data, setData] = useState({ name: "", pic: "", star: 5, message: "" });
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    name: "Name Field is Mendatory",
    pic: "pic is mendatary",
    message: "Message field is Mendatory",
  });

  // dispatch hook for dispatch actions dispatching actions
  let dispatch = useDispatch();

  //useSelector hook for getting state
  let TestimonialStateData = useSelector((state) => state.TestimonialStateData);

  // redirecting page
  let navigate = useNavigate();

  function getInputData(e) {
    let name = e.target.name;
    let value = e.target.files ? e.target.files[0].name : e.target.value;
    // let value = e.target.files ? e.target.files[0]: e.target.value; //when real api used
    setData((old) => {
      return { ...old, [name]: value };
    });
    setErrorMessage((old) => {
      return { ...old, [name]: e.target.files ? "" : formValidations(e) };
    });
    // setShow(false);
  }

  function postData(e) {
    e.preventDefault();

    let error = Object.values(errorMessage).find((x) => x?.length !== 0);

    if (!error) {
      //validating duplicate items
      let item = TestimonialStateData.find(
        (x) => x.name.toLowerCase() === data.name.toLowerCase()
      );
      if (item) {
        setErrorMessage((old) => {
          return { ...old, name: "testimonial name already exist" };
        });
        setShow(true);
      } else {
        //if item duplicate item not found else add item to our state
        dispatch(addTestimonial({ ...data }));

        // when real api used
        /* let formData = new FormData()
         formData.append("name", data.name)
         formData.append("pic",data.pic)
         dispatch(addTestimonial(formData)) */

        navigate("/admin/testimonial");
      }
    } else {
      setShow(true);
    }
  }

  function getAPIData() {
    //action dispatch for get data
    dispatch(getTestimonial());
  }

  //useeffect call once page load
  useEffect(() => {
    //function calls whenever change in dependency
    getAPIData();
  }, [TestimonialStateData.length]);

  return (
    <>
      <Breadcrum title="Admin"></Breadcrum>

      <div className="container">
        <div className="row">
          <div className="col-3">
            <Sidebar />
          </div>
          <div className="col-9">
            <h5 className="bg-primary text-light text-center p-2">
              Testimonial
              <button
                className="float-end text-light border-0 bg-transparent"
                onClick={() => {
                  window.history.back();
                }}
              >
                <i className="fa fa-arrow-left"></i>
              </button>
            </h5>

            {/* form */}

            <form className="mb-3" onSubmit={postData}>
              <div className="mb-3">
                <label>
                  Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={getInputData}
                  placeholder="Testimonial Name"
                  className="form-control"
                />
                {show ? (
                  <p className="text-danger px-2 py-1 text-capitalize">
                    {errorMessage.name}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>
                    Pic<span className="text-danger">*</span>
                  </label>
                  <input
                    type="file"
                    name="pic"
                    onChange={getInputData}
                    className="form-control"
                  />
                  {show ? (
                    <p className="text-danger px-2 py-1 text-capitalize">
                      {errorMessage.pic}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Star</label>
                  <input
                    type="number"
                    name="star"
                    min={1}
                    max={5}
                    value={data.star}
                    onChange={getInputData}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label>
                  Message<span className="text-danger">*</span>
                </label>
                <textarea
                  name="message"
                  onChange={getInputData}
                  rows="3"
                  placeholder="Message..."
                  className="form-control"
                ></textarea>
                {show ? (
                  <p className="text-danger px-2 py-1 text-capitalize">
                    {errorMessage.message}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-3">
                <button type="submit" className=" btn btn-primary w-100">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTestimonial;
