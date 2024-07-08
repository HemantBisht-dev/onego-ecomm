import { Link } from "react-router-dom";
import Breadcrum from "../../Breadcrum";
import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";

const AdminHome = () => {
  const [admin, setAdmin] = useState({});

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
      if (response) setAdmin({ ...response });
    })();
  }, []);

  return (
    <>
      <Breadcrum title="Admin"></Breadcrum>

      <div className="container">
        <div className="row">
          <div className="col-3">
            <Sidebar />
          </div>
          <div className="col-9">
            <h5 className="bg-primary text-light text-center p-2">
              Admin Section
            </h5>
            <div className="row">
              <div className="col-md-6">
                {admin.pic ? (
                  <img
                    src={`/img/${admin.pic}`}
                    style={{ width: "100%", height: 450 }}
                    alt="profile image"
                  />
                ) : (
                  <img
                    src="/img/no profile.png"
                    style={{ width: "100%", height: 400 }}
                    alt="no image"
                  />
                )}
              </div>
              <div className="col-md-6">
                <table className="table table-border">
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <td>{admin.name}</td>
                    </tr>
                    <tr>
                      <th>User Name</th>
                      <td>{admin.username}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{admin.email}</td>
                    </tr>
                    <tr>
                      <th>Phone</th>
                      <td>{admin.phone}</td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <Link to="/update-profile" className="btn btn-primary">
                          Update Profile
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
