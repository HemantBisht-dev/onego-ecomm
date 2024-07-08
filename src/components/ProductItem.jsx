import { Link } from "react-router-dom";

function ProductItem({ item }) {
  return (
    <div className="card">
      <img
        src={`/img/${item.pic[0]}`}
        className="card-img-top"
        alt="..."
        style={{ height: 380 }}
      />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">
          <del className="text-danger">&#8377;{item.baseprice}</del> &#8377;
          {item.finalprice} <sup>{item.discount}% Off</sup>
        </p>
        <Link to={`/single-product/${item.id}`} className="btn btn-primary">
          product
        </Link>
      </div>
    </div>
  );
}
export default ProductItem;
