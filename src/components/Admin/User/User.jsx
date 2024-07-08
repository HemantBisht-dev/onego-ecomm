import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import Breadcrum from "../../Breadcrum";
import Sidebar from "../Sidebar";

function User() {
  const [data, setData] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "username",
      headerName: "User Name",
      width: 100,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 100,
      editable: true,
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 110,
      sortable: false,
      renderCell: ({ row }) => (
        <button className="btn btn-danger" onClick={() => deleteRecord(row.id)}>
          <i className="fa fa-trash"></i>
        </button>
      ),
    },
  ];

  async function deleteRecord(id) {
    if (window.confirm("Are You Sure to Delete that Item : ")) {
      let response = await fetch("http://localhost:8000/user/" + id, {
        method: "delete",
        headers: {
          "content-type": "application/json",
        },
      });
      response = await response.json();
      getAPIData();
    }
  }

  async function getAPIData() {
    let response = await fetch("http://localhost:8000/user", {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    });
    response = await response.json();
    if (response.length) {
      setData(response.reverse());
    }
  }

  useEffect(() => {
    getAPIData();
  }, []);

  return (
    <>
      <Breadcrum title="User" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <Sidebar />
          </div>
          <div className="col-9">
            <h5 className="bg-primary text-light text-center p-2">User</h5>
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

export default User;
