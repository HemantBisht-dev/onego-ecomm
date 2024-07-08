import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Breadcrum from "../../Breadcrum";
import Sidebar from "../Sidebar";
import formValidations from "../../Validation/formValidations";

import {
  getSubcategory,
  updateSubcategory,
} from "../../../Store/ActionCreators/SubcategoryActionCreators";

const UpdateSubcategory = () => {
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // get query parameter
  const { id } = useParams();

  const dispatch = useDispatch();
  const SubcategoryStateData = useSelector(
    (state) => state.SubcategoryStateData
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
      let item = SubcategoryStateData.find(
        (x) => x.name.toLowerCase() === name.toLowerCase()
      );
      if (item) {
        setErrorMessage("subcategory name exist");
        setShow(true);
      } else {
        dispatch(updateSubcategory({ id: id, name: name }));
        navigate("/admin/subcategory");
      }
    } else {
      setShow(true);
    }
  }

  function getAPIData() {
    dispatch(getSubcategory());

    if (SubcategoryStateData.length) {
      // checking if id coming from backend === id query parameter
      const item = SubcategoryStateData.find((x) => x.id === id);
      setName(item.name);
    }
  }

  useEffect(() => {
    getAPIData();
  }, [SubcategoryStateData.length]);

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
              Sub Category
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
                value={name}
                name="name"
                placeholder="subcategory name"
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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateSubcategory;
