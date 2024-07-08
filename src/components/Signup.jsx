import { useState } from "react";
import Breadcrum from "./Breadcrum";
import formValidations from "./Validation/formValidations";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    cpassword: "",
  });

  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    name: "Name field is Mendatory",
    email: "Email field is Mendatory",
    phone: "Phone field is Mendatory",
    username: "Username field is Mendatory",
    password: "Password field is Mendatory",
  });

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

  async function postData(e) {
    e.preventDefault();

    if (data.password !== data.cpassword) {
      setShow(true);
      setErrorMsg((old) => {
        return {
          ...old,
          password: "Confirm your Password",
        };
      });
    }

    // error checking
    let error = Object.values(errorMsg).find((x) => x?.length !== 0);

    // if dont have error
    if (!error) {
      // getting username and password to check if already exist
      let response = await fetch("http://localhost:8000/user", {
        method: "get",
        headers: {
          "content-type": "application/json",
        },
      });
      response = await response.json();
      let item = response.find(
        (x) =>
          x.username.toLowerCase() === data.username.toLowerCase() ||
          x.email.toLowerCase() === data.email.toLowerCase()
      );

      // if our username and email exist in database email and password then show error
      if (item) {
        setShow(true);
        setErrorMsg((old) => {
          return {
            ...old,
            username:
              item.username.toLowerCase() === data.username.toLowerCase()
                ? "Username already exists"
                : "",
            email:
              item.email.toLowerCase() === data.email.toLowerCase()
                ? "Email already exists"
                : "",
          };
        });
      }

      // in case of not matching item with our database else will run and post our data into database
      else {
        let item = {
          name: data.name,
          username: data.username.toLowerCase(), // Convert to lowercase for consistency
          email: data.email.toLowerCase(), // Convert to lowercase for consistency
          phone: data.phone,
          password: data.password,
          role: "Buyer",
        };

        let response = await fetch("http://localhost:8000/user", {
          method: "post",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(item),
        });

        response = await response.json();
        navigate("/login");
      }
    } else {
      setShow(true);
    }
  }

  return (
    <>
      <Breadcrum title="SignUp" />

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
                onChange={getInputData}
              />
              {show ? <p className="text-danger">{errorMsg.name}</p> : ""}
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="username"
                placeholder="user Name"
                className="form-control"
                onChange={getInputData}
              />
              {show ? <p className="text-danger">{errorMsg.username}</p> : ""}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="form-control"
                onChange={getInputData}
              />
              {show ? <p className="text-danger">{errorMsg.email}</p> : ""}
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="form-control"
                onChange={getInputData}
              />
              {show ? <p className="text-danger">{errorMsg.phone}</p> : ""}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
                onChange={getInputData}
              />
              {show ? <p className="text-danger">{errorMsg.password}</p> : ""}
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="password"
                name="cpassword"
                placeholder="Confirm Password"
                className="form-control"
                onChange={getInputData}
              />
            </div>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary w-100">
              Signup
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
