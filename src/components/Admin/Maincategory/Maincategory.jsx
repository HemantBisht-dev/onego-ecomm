import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Breadcrum from "../../Breadcrum";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMaincategory,
  getMaincategory,
} from "../../../Store/ActionCreators/MaincategoryActionCreators";

const Maincategory = () => {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const MaincategoryStateData = useSelector(
    (state) => state.MaincategoryStateData
  );

  const columns = [
    { field: "id", headerName: "ID", width: 90 },

    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "edit",
      headerName: "Edit",
      type: "number",
      width: 150,
      editable: true,
      sortable: false,
      renderCell: ({ row }) => (
        <Link
          to={`/admin/maincategory/update/${row.id}`}
          className="btn btn-primary"
        >
          <i className="fa fa-edit"></i>
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      type: "number",
      width: 110,
      editable: true,
      sortable: false,
      renderCell: ({ row }) => (
        <button className="btn btn-danger" onClick={() => deleteRecord(row.id)}>
          <i className="fa fa-trash"></i>
        </button>
      ),
    },
  ];

  // deleting items

  function deleteRecord(id) {
    if (window.confirm("Are You Sure to Delete that Item : ")) {
      dispatch(deleteMaincategory({ id: id }));
      getAPIData();
    }
  }

  // fetching data from backend API
  function getAPIData() {
    dispatch(getMaincategory());

    if (MaincategoryStateData.length) {
      setData(MaincategoryStateData);
    }
  }

  // showing it once on admin maincategory page
  useEffect(() => {
    getAPIData();
  }, [MaincategoryStateData.length]);

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
              Main Category
              <Link
                to="/admin/maincategory/create"
                className="float-end text-light"
              >
                <i className="fa fa-plus"></i>
              </Link>
            </h5>

            {/* table */}

            {/* <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>
                        <Link
                          to={`/admin/maincategory/update/${item.id}`}
                          className="btn btn-primary"
                        >
                          <i className="fa fa-edit"></i>
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteRecord(item.id)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table> */}

            <table className="table-responsive" style={{ width: "100%" }}>
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
                pageSizeOptions={[5]}
                checkboxSelection={false}
                disableRowSelectionOnClick
              />
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Maincategory;
