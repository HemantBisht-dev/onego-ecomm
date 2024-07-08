import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Breadcrum from "../../Breadcrum";
import Sidebar from "../Sidebar";
import formValidations from "../../Validation/formValidations";

import { useDispatch, useSelector } from "react-redux";

import { addProduct } from "../../../Store/ActionCreators/ProductActionCreators";
import { getMaincategory } from "../../../Store/ActionCreators/MaincategoryActionCreators";
import { getSubcategory } from "../../../Store/ActionCreators/SubcategoryActionCreators";
import { getBrand } from "../../../Store/ActionCreators/BrandActionCreators";
import imageValidation from "../../Validation/imageValidation";

const CreateProduct = () => {
  const [data, setData] = useState({
    name: "",
    maincategory: "",
    subcategory: "",
    brand: "",
    color: "",
    size: "",
    baseprice: 0,
    discount: 0,
    finalprice: 0,
    stock: true,
    description: "",
    quantity: 0,
    pic: "",
  });

  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    name: "Name Field is Mendatory",
    color: "Color Field is Mendatory",
    size: "Size Field is Mendatory",
    baseprice: "Base Price Field is Mendatory",
    discount: "Discount Field is Mendatory",
    quantity: "Stock Quantity Field is Mendatory",
    pic: "pic is mendatary",
  });

  // dispatch hook for dispatch actions dispatching actions
  let dispatch = useDispatch();

  //useSelector hook for getting state
  let MaincategoryStateData = useSelector(
    (state) => state.MaincategoryStateData
  );
  let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData);
  let BrandStateData = useSelector((state) => state.BrandStateData);

  // redirecting page
  let navigate = useNavigate();

  function getInputData(e) {
    let name = e.target.name;
    let value = e.target.files ? e.target.files : e.target.value;

    setData((old) => {
      return {
        ...old,
        [name]: e.target.files ? Array.from(value).map((x) => x.name) : value,
      };
    });
    setErrorMessage((old) => {
      return {
        ...old,
        [name]: e.target.files ? imageValidation(e) : formValidations(e),
      };
    });
  }

  function postData(e) {
    e.preventDefault();

    let error = Object.values(errorMessage).find((x) => x?.length !== 0);

    if (!error) {
      let bp = parseInt(data.baseprice);
      let d = parseInt(data.discount);
      let fp = parseInt(bp - (bp * d) / 100);

      let item = {
        name: data.name,
        maincategory: data.maincategory,
        subcategory: data.subcategory,
        brand: data.brand,
        baseprice: bp,
        discount: d,
        finalprice: fp,
        color: data.color,
        size: data.size,
        stock: data.stock,
        description: data.description,
        quantity: parseInt(data.quantity),
        pic: data.pic,
      };

      dispatch(addProduct(item));
      navigate("/admin/product");
    } else {
      setShow(true);
    }
  }

  function getAPIData() {
    //action dispatch for get data
    dispatch(getMaincategory());
    dispatch(getSubcategory());
    dispatch(getBrand());

    // if admin do not select maincategory, subcategory , brand while create product it will set default value

    if (
      MaincategoryStateData.length &&
      SubcategoryStateData.length &&
      BrandStateData.length
    ) {
      setData((old) => {
        return {
          ...old,
          maincategory: MaincategoryStateData[0].name,
          subcategory: SubcategoryStateData[0].name,
          brand: BrandStateData[0].name,
        };
      });
    }
  }

  //useeffect call once page load
  useEffect(() => {
    //function calls whenever change in dependency
    getAPIData();
  }, [
    MaincategoryStateData.length,
    SubcategoryStateData.length,
    BrandStateData.length,
  ]);

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
              Products
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
              {/* name input  */}
              <label htmlFor="">
                Name <span className="text-danger">*</span>{" "}
              </label>
              <input
                type="text"
                name="name"
                placeholder="product name"
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

              <div className="row mt-3">
                {/* Maincategory dropdown */}
                <div className="col-lg-3 col-md-6 mb-3">
                  <label>
                    Maincategory <span className="text-danger">*</span>
                  </label>
                  <select
                    name="maincategory"
                    className="form-select"
                    onChange={getInputData}
                  >
                    {MaincategoryStateData.map((item, index) => {
                      return <option key={index}>{item.name}</option>;
                    })}
                  </select>
                </div>

                {/* Subcategory dropdown */}

                <div className="col-lg-3 col-md-6 mb-3">
                  <label>
                    Subcategory <span className="text-danger">*</span>
                  </label>
                  <select
                    name="subcategory"
                    className="form-select"
                    onChange={getInputData}
                  >
                    {SubcategoryStateData.map((item, index) => {
                      return <option key={index}>{item.name}</option>;
                    })}
                  </select>
                </div>

                {/* Brand dropdown */}

                <div className="col-lg-3 col-md-6 mb-3">
                  <label>
                    Brand <span className="text-danger">*</span>
                  </label>
                  <select
                    name="brand"
                    className="form-select"
                    onChange={getInputData}
                  >
                    {BrandStateData.map((item, index) => {
                      return <option key={index}>{item.name}</option>;
                    })}
                  </select>
                </div>

                {/* stock dropdown */}

                <div className="col-lg-3 col-md-6 mb-3">
                  <label>
                    Stock <span className="text-danger">*</span>
                  </label>
                  <select
                    name="stock"
                    className="form-select"
                    onChange={getInputData}
                  >
                    <option value={true}>In Stock</option>
                    <option value={false}>Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="row">
                {/* base price */}
                <div className="col-md-4 mb-3">
                  <label>
                    Base Price <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    name="baseprice"
                    className="form-control"
                    placeholder="Base Price"
                    onChange={getInputData}
                  />
                  {show ? (
                    <p className="text-danger px-2 py-1 text-capialize">
                      {errorMessage.baseprice}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                {/* discount */}
                <div className="col-md-4 mb-3">
                  <label>
                    Discount <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    name="discount"
                    className="form-control"
                    placeholder="Discount"
                    onChange={getInputData}
                  />
                  {show ? (
                    <p className="text-danger px-2 py-1 text-capialize">
                      {errorMessage.discount}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                {/* stock quantity */}
                <div className="col-md-4 mb-3">
                  <label>
                    Stock Quantity <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    placeholder="Quantity"
                    onChange={getInputData}
                  />
                  {show ? (
                    <p className="text-danger px-2 py-1 text-capialize">
                      {errorMessage.quantity}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="row">
                {/* Color */}
                <div className="col-md-6 mb-3">
                  <label>
                    Color <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="color"
                    className="form-control"
                    placeholder="Color"
                    onChange={getInputData}
                  />
                  {show ? (
                    <p className="text-danger px-2 py-1 text-capialize">
                      {errorMessage.color}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                {/* size */}
                <div className="col-md-6 mb-3">
                  <label>
                    Size <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="size"
                    className="form-control"
                    placeholder="Size"
                    onChange={getInputData}
                  />
                  {show ? (
                    <p className="text-danger px-2 py-1 text-capialize">
                      {errorMessage.size}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {/* description */}
              <div className="mb-3">
                <label>Descripton</label>
                <textarea
                  name="description"
                  placeholder="write your product description"
                  onChange={getInputData}
                  rows="5"
                  className="form-control"
                ></textarea>
              </div>

              {/* pic input */}
              <label>
                pic <span className="text-danger">*</span>{" "}
              </label>
              <input
                type="file"
                name="pic"
                multiple
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

export default CreateProduct;
