import { useEffect, useState } from "react";
import Breadcrum from "../../Breadcrum";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import {
  deleteContactus,
  getContactus,
} from "../../../Store/ActionCreators/ContactusActionCreators";

function ContactUsQueries() {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const ContactUsStateData = useSelector((state) => state.ContactusStateData);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 110,
      editable: true,
    },
    {
      field: "subject",
      headerName: "Subject",
      width: 110,
      editable: true,
    },
    {
      field: "message",
      headerName: "Message",
      width: 100,
      editable: true,
    },
    {
      field: "active",
      headerName: "Active",
      width: 60,
      editable: true,
    },
    {
      field: "date",
      headerName: "Date",
      width: 170,
      editable: true,
      renderCell: ({ row }) => <p>{new Date(row.date).toLocaleString()}</p>,
    },
    {
      field: "show",
      headerName: "Show",
      width: 50,
      sortable: false,
      renderCell: ({ row }) => (
        <Link
          to={`/admin/contact-us/show/${row.id}`}
          className="btn btn-primary"
        >
          <i className="fa fa-eye"></i>
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 110,
      sortable: false,
      renderCell: ({ row }) =>
        row.active === false ? (
          <button
            className="btn btn-danger"
            onClick={() => deleteRecord(row.id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        ) : (
          ""
        ),
    },
  ];

  function deleteRecord(id) {
    if (window.confirm("Are you sure want to delete ")) {
      dispatch(deleteContactus({ id: id }));
      getAPIData();
    }
  }

  function getAPIData() {
    dispatch(getContactus());
    if (ContactUsStateData.length) {
      setData(ContactUsStateData);
    }
  }

  useEffect(() => {
    getAPIData();
  }, [ContactUsStateData.length]);
  return (
    <>
      <Breadcrum title="ContactUs" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <Sidebar />
          </div>
          <div className="col-9">
            <h5 className="bg-primary text-light text-center p-2">ContactUs</h5>
            <div className="table-responsive">
              <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5, 10, 50, 100]}
                checkboxSelection={false}
                disableRowSelectionOnClick
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUsQueries;
