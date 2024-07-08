import { useState } from "react";
import Breadcrum from "./Breadcrum";
import formValidations from "./Validation/formValidations";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  function getInputData(e) {
    const { name, value } = e.target;
    setData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }

  async function postData(e) {
    e.preventDefault();

    let response = await fetch("http://localhost:8000/user", {
      method: "get",
      header: { "content-type": "application/json" },
    });

    response = await response.json();
    let item = response.find(
      (x) => x.username === data.username || x.email === data.email
    );

    if (item) {
      if (item.password === data.password) {
        localStorage.setItem("login", true);
        localStorage.setItem("name", item.name);
        localStorage.setItem("userId", item.id);
        localStorage.setItem("role", item.role);

        if (item.role === "Admin") {
          navigate("/admin");
        } else {
          navigate("/profile");
        }
      } else {
        setErrorMsg("Invalid Username or Password");
      }
    } else {
      setErrorMsg("Invalid Username or Password");
    }
  }

  return (
    <>
      <Breadcrum title="Login" />

      <div className="container my-3">
        <div className="row">
          <div className="col-md-8 col-sm-10 m-auto">
            <h5 className="bg-primary text-center text-light p-2">
              <span className="text-bold">Login</span> to Your Account
            </h5>
            <form onSubmit={postData}>
              <div className="mb-3">
                <input
                  type="text"
                  name="username"
                  placeholder="user Name or Email"
                  className="form-control"
                  onChange={getInputData}
                />
                {errorMsg ? <p className="text-danger">{errorMsg}</p> : ""}
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  onChange={getInputData}
                />
                {errorMsg ? <p className="text-danger">{errorMsg}</p> : ""}
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </div>
            </form>

            <div className="d-flex justify-content-between">
              <Link to="#">Forget Password</Link>
              <Link to="/signup">Doesnt' Have an Account? Create</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
