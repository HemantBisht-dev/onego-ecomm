import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrum from "./Breadcrum";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWishlist,
  getWishlist,
} from "../Store/ActionCreators/WishlistActionCreators";
import ProfileTable from "./ProfileTable";
import { getCheckout } from "../Store/ActionCreators/CheckoutActionCreators";

function Profile() {
  const [user, setUser] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [checkout, setCheckout] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  let WishlistStateData = useSelector((state) => state.WishlistStateData);
  let CheckoutStateData = useSelector((state) => state.CheckoutStateData);

  function deleteItem(id) {
    if (window.confirm("Are You Sure to Remove that Item from Cart")) {
      dispatch(deleteWishlist({ id: id }));
      getAPIData();
    } else {
      dispatch(deleteWishlist({ id: id }));
      getAPIData();
    }
  }

  function getAPIData() {
    dispatch(getWishlist());
    if (WishlistStateData.length) {
      setWishlist(
        WishlistStateData.filter(
          (x) => x.userid === localStorage.getItem("userId")
        )
      );
    } else {
      setWishlist([]);
    }
  }

  useEffect(() => {
    getAPIData();
  }, [WishlistStateData.length]);

  function getAPIData2() {
    dispatch(getCheckout());
    if (CheckoutStateData.length) {
      setCheckout(
        CheckoutStateData.filter(
          (x) => x.userid === localStorage.getItem("userId")
        )
      );
    } else {
      setCheckout([]);
    }
  }

  // console.log(checkout);
  useEffect(() => {
    getAPIData2();
  }, [CheckoutStateData.length]);

  useEffect(() => {
    (async () => {
      let response = await fetch(
        "http://localhost:8000/user/" + localStorage.getItem("userId"),
        {
          method: "get",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      response = await response.json();

      if (response) {
        setUser(response);
      } else {
        navigate("/login");
      }
    })();
  }, []);

  return (
    <>
      <Breadcrum title="Buyer Profile" />

      <div className="container my-3">
        <div className="row">
          <div className="col-md-6">
            {user.pic ? (
              <img
                src={`/img/${user.pic}`}
                height={400}
                alt="user profile pic"
              />
            ) : (
              <img src="img/no profile.png" height={400} alt="" />
            )}
          </div>
          <div className="col-md-6">
            <h5 className="bg-primary text-light text-center p-2">
              Buyer Profile Section
            </h5>
            <ProfileTable user={user}></ProfileTable>
          </div>
        </div>

        <h5 className="bg-primary p-2 text-center text-light">
          Wishlist Section
        </h5>
        {wishlist.length ? (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <a href={`/img/${item.pic}`} target="_blank">
                          <img
                            src={`/img/${item.pic}`}
                            height={50}
                            width={50}
                            alt=""
                            className="rounded"
                          />
                        </a>
                      </td>
                      <td>{item.name}</td>
                      <td>{item.brand}</td>
                      <td>{item.color}</td>
                      <td>{item.size}</td>
                      <td>&#8377;{item.price}</td>
                      <td className="text-center">
                        <Link
                          to={`/single-product/${item.productid}`}
                          onClick={() => addToCart(item.id, item.name)}
                          className="btn btn-primary"
                        >
                          <i className="fa fa-shopping-cart"></i>
                        </Link>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteItem(item.id)}
                        >
                          <i className="fa fa-close"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center">
            <h3>No Items in Wishlist</h3>
            <Link to="/shop" className="btn btn-primary">
              Shop Now
            </Link>
          </div>
        )}

        {/* track order */}

        <h5 className="bg-primary p-2 text-center text-light my-3">
          Order Section
        </h5>
        {checkout.length ? (
          checkout.map((item, index) => {
            return (
              <div className="row" key={index}>
                <div className="col-md-4">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <th>Order ID</th>
                          <td>{item.id}</td>
                        </tr>
                        <tr>
                          <th>Order Status</th>
                          <td>{item.orderstatus}</td>
                        </tr>
                        <tr>
                          <th>Payment Mode</th>
                          <td>{item.paymentmode}</td>
                        </tr>
                        <tr>
                          <th>Payment Status</th>
                          <td>{item.paymentstatus}</td>
                        </tr>
                        <tr>
                          <th>Subtotal</th>
                          <td>&#8377;{item.subtotal}</td>
                        </tr>
                        <tr>
                          <th>Shipping</th>
                          <td>&#8377;{item.shipping}</td>
                        </tr>
                        <tr>
                          <th>Total</th>
                          <td>&#8377;{item.total}</td>
                        </tr>
                        <tr>
                          <th>Date</th>
                          <td>{new Date(item.date).toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Name</th>
                          <th>Brand</th>
                          <th>Color</th>
                          <th>Size</th>
                          <th>Price</th>
                          <th>Qty</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.products.map((p, ind) => {
                          return (
                            <tr key={ind}>
                              <td>
                                <a href={`/img/${p.pic}`} target="_blank">
                                  <img
                                    src={`/img/${p.pic}`}
                                    height={50}
                                    width={50}
                                    alt=""
                                    className="rounded"
                                  />
                                </a>
                              </td>
                              <td>{p.name}</td>
                              <td>{p.brand}</td>
                              <td>{p.color}</td>
                              <td>{p.size}</td>
                              <td>&#8377;{p.price}</td>
                              <td>{p.qty}</td>
                              <td>&#8377;{p.total}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center">
            <h3>No Items in Wishlist</h3>
            <Link to="/shop" className="btn btn-primary">
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
