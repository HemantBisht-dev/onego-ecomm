import { useNavigate, useParams } from "react-router-dom";
import Breadcrum from "../../Breadcrum";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteContactus,
  getContactus,
  updateContactus,
} from "../../../Store/ActionCreators/ContactusActionCreators";

function ContactUsShow() {
  const [data, setData] = useState({});
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ContactusStateData = useSelector((state) => state.ContactusStateData);

  function deleteRecord() {
    if (window.confirm("Are you sure want to delete")) {
      dispatch(deleteContactus({ id: id }));
      navigate("/admin/contact-us");
    }
  }

  function updateRecord() {
    if (window.confirm("Are You Sure to Change Active Status to Inactive : ")) {
      dispatch(updateContactus({ ...data, active: false }));
      setData({ ...data, active: false });
    }
  }

  function getAPIData() {
    dispatch(getContactus());
    if (ContactusStateData.length) {
      setData(ContactusStateData.find((x) => x.id === id));
    }
  }

  useEffect(() => {
    getAPIData();
  }, [ContactusStateData.length]);
  return (
    <>
      <Breadcrum title="Admin" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <Sidebar />
          </div>
          <div className="col-9">
            <h5 className="bg-primary text-light text-center p-2">
              Contact-us Query
            </h5>
            <div className="table-responsive">
              <div className="table table-bordered">
                <tbody>
                  <tr>
                    <th>Id</th>
                    <td>{data.id}</td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td>{data.name}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{data.email}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>{data.phone}</td>
                  </tr>
                  <tr>
                    <th>Subject</th>
                    <td>{data.subject}</td>
                  </tr>
                  <tr>
                    <th>Message</th>
                    <td>{data.message}</td>
                  </tr>
                  <tr>
                    <th>Active</th>
                    <td>{data.active ? "true" : "false"}</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td>{new Date(data.date).toLocaleString()}</td>
                  </tr>
                  <tr>
                    {data.active ? (
                      <td colSpan={2}>
                        <button
                          className="btn btn-primary w-100"
                          onClick={updateRecord}
                        >
                          Update Active Status to Inactive
                        </button>
                      </td>
                    ) : (
                      <td colSpan={2}>
                        <button
                          className="btn btn-danger w-100"
                          onClick={deleteRecord}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                </tbody>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUsShow;
