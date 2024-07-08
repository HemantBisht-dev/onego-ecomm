import { Link } from "react-router-dom";

const Breadcrum = ({ title }) => {
  return (
    <>
      {/* <!-- Page Header Start --> */}
      <div
        className="container-fluid page-header mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <h1 className="display-3 mb-4 animated slideInDown">{title}</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item " aria-current="page">
                {title}
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* <!-- Page Header End --> */}
    </>
  );
};

export default Breadcrum;
