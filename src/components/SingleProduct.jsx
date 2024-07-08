import { useNavigate, useParams } from "react-router-dom";
import Breadcrum from "./Breadcrum";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../Store/ActionCreators/ProductActionCreators";
import { getCart, addCart } from "../Store/ActionCreators/CartActionCreators";
import {
  getWishlist,
  addWishlist,
} from "../Store/ActionCreators/WishlistActionCreators";
import ProductSlider from "./ProductSlider";

function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const ProductStateData = useSelector((state) => state.ProductStateData);
  const CartStateData = useSelector((state) => state.CartStateData);
  const WishlistStateData = useSelector((state) => state.WishlistStateData);

  function addToCart() {
    let item = CartStateData.find(
      (x) =>
        x.productid === product.id &&
        x.userid === localStorage.getItem("userId")
    );

    if (!item) {
      item = {
        productid: product.id,
        userid: localStorage.getItem("userId"),
        name: product.name,
        brand: product.brand,
        color: product.color,
        size: product.size,
        price: product.finalprice,
        qty: qty,
        stockQuantity: product.quantity,
        total: product.finalprice * qty,
        pic: product.pic[0],
      };
      dispatch(addCart(item));
      navigate("/cart");
    } else {
      navigate("/cart");
    }
  }

  function addToWishlist() {
    let item = WishlistStateData.find(
      (x) =>
        x.productid === product.id &&
        x.userid === localStorage.getItem("userId")
    );

    if (!item) {
      item = {
        productid: product.id,
        userid: localStorage.getItem("userId"),
        name: product.name,
        brand: product.brand,
        color: product.color,
        size: product.size,
        price: product.finalprice,
        pic: product.pic[0],
      };
      dispatch(addWishlist(item));
      navigate("/profile");
    } else {
      navigate("/profile");
    }
  }

  function getInputData(option) {
    if (option === "dec" && qty === 1) {
      return;
    } else if (option === "dec") {
      setQty(qty - 1);
    } else if (qty < product.quantity) {
      setQty(qty + 1);
    }
  }

  useEffect(() => {
    (() => {
      dispatch(getCart());
    })();
  }, [CartStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getWishlist());
    })();
  }, [WishlistStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getProduct());
      if (ProductStateData.length) {
        let item = ProductStateData.find((x) => x.id === id);
        setProduct(item);
        setRelatedProducts(
          ProductStateData.filter(
            (x) =>
              x.maincategory === item.maincategory &&
              x.subcategory === item.subcategory &&
              x.brand === item.brand
          )
        );
      }
    })();
  }, [ProductStateData.length]);

  return (
    <>
      <Breadcrum title="Product Page"></Breadcrum>

      <div className="container-fluid my-3">
        <div className="row">
          {/* crousel */}
          <div className="col-md-4">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                {product.pic &&
                  product.pic.slice(1).map((item, index) => {
                    return (
                      <button
                        key={index}
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={index + 1}
                        aria-label={`Slide ${index + 2}`}
                      ></button>
                    );
                  })}
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src={`/img/${product.pic && product.pic[0]}`}
                    height={500}
                    className="d-block w-100 "
                    alt="..."
                  />
                </div>
                {product.pic &&
                  product.pic.slice(1).map((item, index) => {
                    return (
                      <div key={index} className="carousel-item">
                        <img
                          src={`/img/${item}`}
                          height={500}
                          className="d-block w-100 "
                          alt="..."
                        />
                      </div>
                    );
                  })}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
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
                data-bs-target="#carouselExampleIndicators"
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

          {/* product details */}
          <div className="col-md-8">
            <h5 className="bg-primary p-2 text-center p-2 text-light">
              {product.name}
            </h5>
            <table className="table table-bordered table-hover">
              <tbody>
                <tr>
                  <th>MainCategory</th>
                  <td>{product.maincategory}</td>
                </tr>
                <tr>
                  <th>SubCategory</th>
                  <td>{product.subcategory}</td>
                </tr>
                <tr>
                  <th>Brand</th>
                  <td>{product.brand}</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td>
                    <del className="text-danger">
                      &#8377;{product.baseprice}
                    </del>{" "}
                    &#8377;{product.finalprice}{" "}
                    <sup className="text-success">{product.discount}% off</sup>
                  </td>
                </tr>

                <tr>
                  <th>Color</th>
                  <td>{product.color}</td>
                </tr>
                <tr>
                  <th>Size</th>
                  <td>{product.size}</td>
                </tr>
                <tr>
                  <th>Stock</th>
                  <td>
                    {product.stock ? "In stock" : "Out of Stock"}
                    {product.stock ? `/${product.quantity} Item left` : ""}
                  </td>
                </tr>
                {product.stock ? (
                  <tr>
                    <td colSpan={3}>
                      <div className="row">
                        <div className="col-lg-3 col-md-6 text center">
                          <div className="mb-1 btn-group">
                            <button
                              className="btn btn-primary"
                              onClick={() => getInputData("dec")}
                            >
                              <i className="fa fa-minus"></i>
                            </button>
                            <p
                              className="text-center text-bold fs-5"
                              style={{ width: 60 }}
                            >
                              {qty}
                            </p>
                            <button
                              className="btn btn-primary"
                              onClick={() => getInputData("inc")}
                            >
                              <i className="fa fa-plus"></i>
                            </button>
                          </div>
                        </div>
                        <div className="col-lg-9 col-md-6 text-center mt-1">
                          <div className="ms-1 btn-group">
                            <button
                              className="btn btn-primary"
                              onClick={addToCart}
                            >
                              <i className="fa fa-shopping-cart"></i>
                              Add to Cart
                            </button>
                            <button
                              className="btn btn-success"
                              onClick={addToWishlist}
                            >
                              <i className="fa fa-heart"></i>
                              Add to Wishlist
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <th colSpan={2}>
                      <button
                        className="btn btn-success my-3"
                        onClick={addToWishlist}
                      >
                        <i className="fa fa-heart"></i>
                        Add to Wishlist
                      </button>
                    </th>
                  </tr>
                )}
                <tr>
                  <th>Description</th>
                  <td>{product.description}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* related products */}

      <h5 className="bg-primary p-2 text-light text-center">
        Related Products
      </h5>
      <ProductSlider data={relatedProducts}></ProductSlider>
    </>
  );
}

export default SingleProduct;
