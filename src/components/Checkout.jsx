import { useEffect, useState } from "react";
import Breadcrum from "./Breadcrum";
import ProfileTable from "./ProfileTable";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCart,
  getCart,
} from "../Store/ActionCreators/CartActionCreators";
import {
  getProduct,
  updateProduct,
} from "../Store/ActionCreators/ProductActionCreators";
import { addCheckout } from "../Store/ActionCreators/CheckoutActionCreators";

function Checkout() {
  const [user, setUser] = useState({});
  const [carts, setCarts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);
  const [mode, setMode] = useState("COD");

  const dispatch = useDispatch();
  const CartStateData = useSelector((state) => state.CartStateData);
  const ProductStateData = useSelector((state) => state.ProductStateData);
  const navigate = useNavigate();

  function placeOrder() {
    let item = {
      userid: localStorage.getItem("userId"),
      orderstatus: "order is Placed",
      paymentstatus: "Pending",
      paymentmode: "COD",
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      date: new Date(),
      products: carts,
    };
    dispatch(addCheckout(item));
    for (const item of carts) {
      // after placeOrder quantity of product must be decrease
      let prod = ProductStateData.find((x) => x.id === item.productid);
      prod.quantity = prod.quantity - item.qty;

      if (prod.quantity === 0) {
        prod.stock = false;
      }
      dispatch(updateProduct({ ...prod }));
      dispatch(deleteCart({ id: item.id }));
    }

    navigate("/confirmation");
  }

  function getAPIData() {
    dispatch(getCart());
    if (CartStateData.length) {
      let items = CartStateData.filter(
        (x) => x.userid === localStorage.getItem("userId")
      );
      setCarts(items);
      let subtotal = 0;
      let shipping = 0;
      let total = 0;

      for (let item of items) {
        subtotal += item.total;
      }
      if (subtotal > 0 && subtotal < 1000) {
        shipping = 150;
        total = subtotal + shipping;
      } else if (subtotal > 1000) {
        total = total + subtotal;
      }

      setSubtotal(subtotal);
      setShipping(shipping);
      setTotal(total);
    }
  }

  useEffect(() => {
    getAPIData();
  }, [CartStateData.length]);

  useEffect(() => {
    (() => {
      dispatch(getProduct());
    })();
  }, [ProductStateData.length]);

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
      <Breadcrum title="Checkout" />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-4">
            <h5 className="bg-primary text-center p-2 text-light">
              Billing & Shipping Address
            </h5>
            <ProfileTable user={user} />
          </div>
          <div className="col-md-8">
            <h5 className="bg-primary text-center p-2 text-light">
              Cart Items
            </h5>
            {carts.length ? (
              <div>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th className="text-center">Qty</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {carts.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="text-center">
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
                            <td className="text-center">{item.qty}</td>
                            <td>&#8377;{item.total}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <th>SubTotal</th>
                      <td>&#8377;{subtotal}</td>
                    </tr>
                    <tr>
                      <th>Shipping</th>
                      <td>&#8377;{shipping}</td>
                    </tr>
                    <tr>
                      <th>Total</th>
                      <td>&#8377;{total}</td>
                    </tr>
                    <tr>
                      <th>Payment Mode</th>
                      <td>
                        <select
                          name="mode"
                          className="form-select"
                          onChange={(e) => setMode(e.target.value)}
                        >
                          <option>COD</option>
                          <option>Net Banking</option>
                        </select>
                      </td>
                    </tr>

                    <tr>
                      <td colSpan={2}>
                        <button
                          to="/checkout"
                          className="btn btn-primary w-100"
                          onClick={placeOrder}
                        >
                          Place Order
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center">
                <h2>No item in cart</h2>
                <Link to="/shop" className="btn btn-primary">
                  Shop Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
