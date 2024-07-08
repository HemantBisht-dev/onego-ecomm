import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Breadcrum from "../../Breadcrum";
import Sidebar from "../Sidebar";
import formValidations from "../../Validation/formValidations";

import { useDispatch, useSelector } from "react-redux";

import {
  addBrand,
  getBrand,
  updateBrand,
} from "../../../Store/ActionCreators/BrandActionCreators";

const UpdateBrand = () => {
  const [data, setData] = useState({ name: "", pic: "" });
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    name: "",
  });

  const { id } = useParams();

  // dispatch hook for dispatch actions dispatching actions
  let dispatch = useDispatch();

  //useSelector hook for getting state
  let BrandStateData = useSelector((state) => state.BrandStateData);

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
      let item = BrandStateData.find(
        (x) => x.name.toLowerCase() === data.name.toLowerCase() && x.id !== id
      );
      if (item) {
        setErrorMessage((old) => {
          return { ...old, name: "brand name already exist" };
        });
        setShow(true);
      } else {
        //if item duplicate item not found else add item to our state
        dispatch(updateBrand({ id: id, name: data.name, pic: data.pic }));

        // when real api used
        /* let formData = new FormData()

         formData.append("id", data.id)
         formData.append("name", data.name)
         formData.append("pic",data.pic)
         dispatch(addBrand(formData)) */

        navigate("/admin/brand");
      }
    } else {
      setShow(true);
    }
  }

  function getAPIData() {
    //action dispatch for get data
    dispatch(getBrand());

    if (BrandStateData.length) {
      let item = BrandStateData.find((x) => x.id === id);
      setData({ ...item });
    }
  }

  //useeffect call once page load
  useEffect(() => {
    //function calls whenever change in dependency
    getAPIData();
  }, [BrandStateData.length]);

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
              Brand
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
                value={data.name}
                placeholder="brand name"
                className="form-control"
                onChange={getInputData}
              />
              {show ? (
                <p className="text-danger text-capitalize">
                  {errorMessage.name}
                </p>
              ) : (
                ""
              )}
              <label htmlFor="">pic</label>
              <input
                type="file"
                name="pic"
                className="form-control"
                onChange={getInputData}
              />
              {show ? (
                <p className="text-danger text-capitalize">
                  {errorMessage.pic}
                </p>
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

export default UpdateBrand;
