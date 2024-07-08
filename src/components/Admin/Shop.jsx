import { useEffect, useState } from "react";
import Breadcrum from "../Breadcrum";
import { useDispatch, useSelector } from "react-redux";
import { getMaincategory } from "../../Store/ActionCreators/MaincategoryActionCreators";
import { getSubcategory } from "../../Store/ActionCreators/SubcategoryActionCreators";
import { getBrand } from "../../Store/ActionCreators/BrandActionCreators";
import { getProduct } from "../../Store/ActionCreators/ProductActionCreators";
import ProductItem from "../ProductItem";
import { Link } from "react-router-dom";

function Shop() {
  const [maincategories, setMaincategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredData1, setFilteredData1] = useState([]);
  const [filteredData2, setFilteredData2] = useState([]);

  const [flag, setFlag] = useState(true);
  const [search, setSearch] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  // query parameters

  let [mc, setMc] = useState(
    new URLSearchParams(window.location.href).get("mc")
  );
  let [sc, setSc] = useState(
    new URLSearchParams(window.location.href).get("sc")
  );
  let [br, setBr] = useState(
    new URLSearchParams(window.location.href).get("br")
  );

  let dispatch = useDispatch();

  const MaincategoryStateData = useSelector(
    (state) => state.MaincategoryStateData
  );
  const SubcategoryStateData = useSelector(
    (state) => state.SubcategoryStateData
  );
  const BrandStateData = useSelector((state) => state.BrandStateData);
  const ProductStateData = useSelector((state) => state.ProductStateData);

  // price filter

  function priceFilter(e) {
    e.preventDefault();

    // filter according to searchbar
    if (search) {
      setProducts(
        filteredData2.filter((x) => x.finalprice >= min && x.finalprice <= max)
      );

      // filter according to filters
    } else if (filteredData1.length) {
      setProducts(
        filteredData1.filter((x) => x.finalprice >= min && x.finalprice <= max)
      );

      // filter according to all products
    } else {
      setProducts(
        ProductStateData.filter(
          (x) => x.finalprice >= min && x.finalprice <= max
        )
      );
    }
  }

  // price sort

  function sortFilter(e) {
    const value = e.target.value;

    if (value === "1") {
      products.sort().reverse();
    } else if (value === "2") {
      products.sort((x, y) => x.finalprice - y.finalprice); //  L ot H
    } else products.sort((x, y) => y.finalprice - x.finalprice); // H to L

    setFlag(!flag);
  }

  // searching

  function postSearch(e) {
    e.preventDefault();
    setMc(null);
    setSc(null);
    setBr(null);

    let srch = search.toLowerCase();

    let data = ProductStateData.filter(
      (x) =>
        x.name.toLowerCase().includes(srch) ||
        x.maincategory.toLowerCase() === srch ||
        x.subcategory.toLowerCase() === srch ||
        x.brand.toLowerCase() === srch ||
        x.color.toLowerCase() === srch ||
        x.description.toLowerCase().includes(srch)
    );
    setProducts(data);
    setFilteredData2(data);
  }

  // filter data
  function filterData(mc, sc, br) {
    let data = [];
    if (mc === null && sc === null && br === null) {
      data = ProductStateData;
    } else if (mc !== null && sc === null && br === null) {
      data = ProductStateData.filter((x) => x.maincategory === mc);
    } else if (mc === null && sc !== null && br === null) {
      data = ProductStateData.filter((x) => x.subcategory === sc);
    } else if (mc === null && sc === null && br !== null) {
      data = ProductStateData.filter((x) => x.brand === br);
    } else if (mc !== null && sc !== null && br === null) {
      data = ProductStateData.filter(
        (x) => x.maincategory === mc && x.subcategory === sc
      );
    } else if (mc !== null && sc === null && br !== null) {
      data = ProductStateData.filter(
        (x) => x.maincategory === mc && x.brand === br
      );
    } else if (mc === null && sc !== null && br !== null) {
      data = ProductStateData.filter(
        (x) => x.subcategory === sc && x.brand === br
      );
    } else {
      data = ProductStateData.filter(
        (x) => x.maincategory === mc && x.subcategory === sc && x.brand === br
      );
    }

    setProducts(data);
    setFilteredData1(data);
  }

  function getCategoryFilter(mc, sc, br) {
    setMc(mc);
    setSc(sc);
    setBr(br);
    setSearch("");
    setMin("");
    setMax("");
    filterData(mc, sc, br);
  }

  // maincategory
  useEffect(() => {
    (() => {
      dispatch(getMaincategory());

      if (MaincategoryStateData.length) {
        setMaincategories(MaincategoryStateData);
      }
    })();
  }, [MaincategoryStateData.length]);

  // subcategory
  useEffect(() => {
    (() => {
      dispatch(getSubcategory());

      if (SubcategoryStateData.length) {
        setSubcategories(SubcategoryStateData);
      }
    })();
  }, [SubcategoryStateData.length]);

  // brand

  useEffect(() => {
    (() => {
      dispatch(getBrand());

      if (BrandStateData.length) {
        setBrands(BrandStateData);
      }
    })();
  }, [BrandStateData.length]);

  // products
  useEffect(() => {
    (() => {
      dispatch(getProduct());

      if (mc !== null || sc !== null || br !== null) {
        filterData(mc, sc, br);
      } else if (ProductStateData.length) {
        setProducts(ProductStateData);
      }
    })();
  }, [ProductStateData.length]);
  return (
    <>
      <Breadcrum title="Shop" />

      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-lg-2 col-md-3">
            <div className="list-group">
              <Link
                to="#"
                className="list-group-item list-group-item-action active"
                aria-current="true"
              >
                Main Category
              </Link>
              <button
                onClick={() => getCategoryFilter(null, sc, br)}
                className={`list-group-item list-group-item-action ${
                  mc === null ? "text-primary text-bold" : ""
                }`}
              >
                All
              </button>
              {maincategories.map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => getCategoryFilter(item.name, sc, br)}
                    className={`list-group-item list-group-item-action ${
                      mc === item.name ? "text-primary text-bold" : ""
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
            <div className="list-group">
              <Link
                to="#"
                className="list-group-item list-group-item-action active"
                aria-current="true"
              >
                Sub Category
              </Link>
              <button
                onClick={() => getCategoryFilter(mc, null, br)}
                className={`list-group-item list-group-item-action ${
                  sc === null ? "text-primary text-bold" : ""
                }`}
              >
                All
              </button>
              {subcategories.map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => getCategoryFilter(mc, item.name, br)}
                    className={`list-group-item list-group-item-action ${
                      sc === item.name ? "text-primary text-bold" : ""
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
            <div className="list-group">
              <Link
                to="#"
                className="list-group-item list-group-item-action active"
                aria-current="true"
              >
                Brand
              </Link>
              <button
                onClick={() => getCategoryFilter(mc, sc, null)}
                className={`list-group-item list-group-item-action ${
                  br === null ? "text-primary text-bold" : ""
                }`}
              >
                All
              </button>
              {brands.map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => getCategoryFilter(mc, sc, item.name)}
                    className={`list-group-item list-group-item-action ${
                      br === item.name ? "text-primary text-bold" : ""
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
            <h5 className="bg-primary text-light text-center p-2">
              Price Range
            </h5>
            <form onSubmit={priceFilter}>
              <div className="my-3">
                <input
                  type="number"
                  name="min"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  placeholder="Min. Amount"
                  className="form-control"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="max"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  placeholder="Max Amount"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  Apply Filter
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg-10 col-md-9">
            <div className="row mb-2">
              <div className="col-lg-9 col-md-8 col-12">
                <form onSubmit={postSearch}>
                  <div className="btn-group w-100">
                    <input
                      type="search"
                      name="search"
                      value={search}
                      placeholder="search product"
                      className="form-control"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-lg-3 col-md-4 col-12">
                <select
                  name="sort"
                  onChange={sortFilter}
                  className="form-control"
                >
                  <option value="1">Latest</option>
                  <option value="2">Price: L to H</option>
                  <option value="3">Price: H to L</option>
                </select>
              </div>
            </div>
            <div className="row g-4">
              {products.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="col-xxl-3 col-lg-4 col-md-6 col-12"
                  >
                    <ProductItem item={item} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
