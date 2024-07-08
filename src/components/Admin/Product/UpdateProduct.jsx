import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Breadcrum from "../../Breadcrum";
import Sidebar from "../Sidebar";
import formValidations from "../../Validation/formValidations";

import { useDispatch, useSelector } from "react-redux";

import {
  addProduct,
  getProduct,
  updateProduct,
} from "../../../Store/ActionCreators/ProductActionCreators";
import { getMaincategory } from "../../../Store/ActionCreators/MaincategoryActionCreators";
import { getSubcategory } from "../../../Store/ActionCreators/SubcategoryActionCreators";
import { getBrand } from "../../../Store/ActionCreators/BrandActionCreators";
import imageValidation from "../../Validation/imageValidation";

const CreateProduct = () => {
  let [flag, setFlag] = useState(false);
  let { id } = useParams();
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
    pic: [],
  });

  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    color: "",
    size: "",
    baseprice: "",
    discount: "",
    quantity: "",
    pic: "",
  });

  // dispatch hook for dispatch actions dispatching actions
  let dispatch = useDispatch();

  //useSelector hook for getting state
  let MaincategoryStateData = useSelector(
    (state) => state.MaincategoryStateData
  );
  let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData);
  let BrandStateData = useSelector((state) => state.BrandStateData);
  let ProductStateData = useSelector((state) => state.ProductStateData);

  // redirecting page
  let navigate = useNavigate();

  function getInputData(e) {
    let name = e.target.name;
    let value = e.target.files ? e.target.files : e.target.value;

    setData((old) => {
      return {
        ...old,
        [name]: e.target.files
          ? data.pic.concat(Array.from(value).map((x) => x.name))
          : value,
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
        id: id,
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

      dispatch(updateProduct(item));
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
    dispatch(getProduct());

    if (ProductStateData.length) {
      let item = ProductStateData.find((x) => x.id === id);
      setData({ ...item });
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
    ProductStateData.length,
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
                value={data.name}
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
                    value={data.maincategory}
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
                    value={data.subcategory}
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
                    value={data.brand}
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
                    value={data.stock}
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
                    value={data.baseprice}
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
                    value={data.discount}
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
                    value={data.quantity}
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
                    value={data.color}
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
                    value={data.size}
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
                  value={data.description}
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
              {data.pic.length ? (
                <p className="my-1">click to delete image</p>
              ) : (
                ""
              )}

              <div className="d-flex flex-wrap">
                {data.pic.map((item, index) => {
                  return (
                    <div key={index} className="mx-1">
                      <img
                        src={`/img/${item}`}
                        height={50}
                        width={50}
                        onClick={() => {
                          data.pic.splice(index, 1);
                          setFlag(!flag);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
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

export default CreateProduct;
