import { useEffect, useState } from "react";
import Breadcrum from "./Breadcrum";
import {
  deleteCart,
  getCart,
  updateCart,
} from "../Store/ActionCreators/CartActionCreators";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Cart() {
  const [carts, setCarts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const CartStateData = useSelector((state) => state.CartStateData);

  function updateItem(id, option) {
    let item = carts.find((x) => x.id === id);
    if (option === "DEC" && item.qty === 1) {
      return;
    } else if (option === "DEC") {
      item.qty = item.qty - 1;
      item.total = item.total - item.price;
    } else if (item.qty < item.stockQuantity) {
      item.qty = item.qty + 1;
      item.total = item.total + item.price;
    }
    console.log({ ...item });
    dispatch(updateCart(item));

    let subtotal = 0;
    let shipping = 0;
    let total = 0;

    for (let item of carts) {
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

  function deleteItem(id) {
    if (window.confirm("Are You Sure to Remove that Item from Cart")) {
      dispatch(deleteCart({ id: id }));
      getAPIData();
    }
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

  return (
    <>
      <Breadcrum title="Cart" />

      <div className="containr-fluid my-3">
        <h5 className="bg-primary text-center text-light p-2">Cart Items</h5>

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
                    <th></th>
                    <th className="text-center">Quantity</th>
                    <th></th>
                    <th>Total</th>
                    <th></th>
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
                        <td className="text-center">
                          <button
                            className="btn btn-primary"
                            onClick={() => updateItem(item.id, "DEC")}
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                        </td>
                        <td className="text-center">{item.qty}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-primary"
                            onClick={() => updateItem(item.id, "INC")}
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                        </td>
                        <td>{item.total}</td>
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
            <div className="row">
              <div className="col-md-6"></div>
              <div className="col-md-6">
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
                      <td colSpan={2}>
                        <Link to="/checkout" className="btn btn-primary w-100">
                          Proceed To Checkout
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
    </>
  );
}

export default Cart;
