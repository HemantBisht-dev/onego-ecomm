import { useEffect, useState } from "react";
import Breadcrum from "./Breadcrum";
import formValidations from "./Validation/formValidations";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    name: "",
    phone: "",
  });

  console.log(data);

  function getInputData(e) {
    const { name, value } = e.target;
    setErrorMsg((old) => {
      return {
        ...old,
        [name]: formValidations(e),
      };
    });
    setData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }

  function getInputFile(e) {
    const { name, files } = e.target;
    setData((old) => {
      return {
        ...old,
        [name]: files[0].name,
      };
    });
  }

  async function postData(e) {
    e.preventDefault();

    // error checking
    let error = Object.values(errorMsg).find((x) => x?.length !== 0);

    // if dont have error
    if (!error) {
      let response = await fetch(
        "http://localhost:8000/user/" + localStorage.getItem("userId"),
        {
          method: "put",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ ...data }),
        }
      );

      response = await response.json();
      if (data.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } else {
      setShow(true);
    }
  }

  useEffect(() => {
    (async () => {
      let response = await fetch(
        "http://localhost:8000/user/" + localStorage.getItem("userId"),
        {
          method: "get",
          headers: { "content-type": "application/json" },
        }
      );

      response = await response.json();
      if (response) {
        console.log(response);
        setData({ ...response });
      }
    })();
  }, []);

  return (
    <>
      <Breadcrum title="UpdateProfile" />

      <div className="container my-3">
        <h5 className="bg-primary text-center text-light p-2">
          <span className="text-bold">Create</span> a Free Account
        </h5>

        <form onSubmit={postData}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="form-control"
                value={data.name}
                onChange={getInputData}
              />
              {show ? <p className="text-danger">{errorMsg.name}</p> : ""}
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="form-control"
                value={data.phone}
                onChange={getInputData}
              />
              {show ? <p className="text-danger">{errorMsg.phone}</p> : ""}
            </div>

            <div className="mb-3">
              <textarea
                name="address"
                rows={3}
                className="form-control"
                placeholder="address..."
                value={data.address}
                onChange={getInputData}
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="city"
                placeholder="City Name"
                className="form-control"
                value={data.city}
                onChange={getInputData}
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="state"
                placeholder="State Name"
                className="form-control"
                value={data.state}
                onChange={getInputData}
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="pin"
                placeholder="PIN code"
                className="form-control"
                value={data.pin}
                onChange={getInputData}
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="file"
                name="pic"
                className="form-control"
                onChange={getInputFile}
              />
            </div>
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-primary w-100">
              UpdateProfile
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateProfile;
