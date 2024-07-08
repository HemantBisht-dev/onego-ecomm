import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Breadcrum from "../../Breadcrum";
import Sidebar from "../Sidebar";
import formValidations from "../../Validation/formValidations";

import { useDispatch, useSelector } from "react-redux";

import {
  addMaincategory,
  getMaincategory,
} from "../../../Store/ActionCreators/MaincategoryActionCreators";

const CreateMainCategory = () => {
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Name Field is Mendatory");

  // dispatch hook for dispatch actions dispatching actions
  let dispatch = useDispatch();

  //useSelector hook for getting state
  let MaincategoryStateData = useSelector(
    (state) => state.MaincategoryStateData
  );

  // redirecting page
  let navigate = useNavigate();

  function getInputData(e) {
    setName(e.target.value);
    setErrorMessage(formValidations(e));
    // setShow(false);
  }

  function postData(e) {
    e.preventDefault();

    if (errorMessage.length === 0) {
      //validating duplicate items
      let item = MaincategoryStateData.find(
        (x) => x.name.toLowerCase() === name.toLowerCase()
      );
      if (item) {
        setErrorMessage("maincategory name exist");
        setShow(true);
      } else {
        //if item duplicate item not found else add item to our state
        dispatch(addMaincategory({ name: name }));
        navigate("/admin/maincategory");
      }
    } else {
      setShow(true);
    }
  }

  function getAPIData() {
    //action dispatch for get data
    dispatch(getMaincategory());
  }

  //useeffect call once page load
  useEffect(() => {
    //function calls whenever change in dependency
    getAPIData();
  }, [MaincategoryStateData.length]);

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
              Main Category
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
              <label htmlFor="">
                Name <span className="text-danger">*</span>{" "}
              </label>
              <input
                type="text"
                name="name"
                placeholder="maincategory name"
                className="form-control"
                onChange={getInputData}
              />
              {show ? (
                <p className="text-danger text-capitalize">{errorMessage}</p>
              ) : (
                ""
              )}
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

export default CreateMainCategory;
