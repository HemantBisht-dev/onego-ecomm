import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Breadcrum from "../../Breadcrum";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBrand,
  getBrand,
} from "../../../Store/ActionCreators/BrandActionCreators";

const Brand = () => {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const BrandStateData = useSelector((state) => state.BrandStateData);
  // console.log(BrandStateData);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },

    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "pic",
      headerName: "Pic",
      width: 150,
      editable: false,
      renderCell: ({ row }) => (
        <a href={`/brands/${row.pic}`} target="_blank" rel="noreferrer">
          <img src={`/brands/${row.pic}`} height={50} width={50} />
        </a>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      type: "number",
      width: 150,
      editable: true,
      sortable: false,
      renderCell: ({ row }) => (
        <Link to={`/admin/brand/update/${row.id}`} className="btn btn-primary">
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
      dispatch(deleteBrand({ id: id }));
      getAPIData();
    }
  }

  // fetching data from backend API
  function getAPIData() {
    dispatch(getBrand());

    if (BrandStateData.length) {
      setData(BrandStateData);
    }
  }

  // showing it once on admin brand page
  useEffect(() => {
    getAPIData();
  }, [BrandStateData.length]);

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
              Brands
              <Link to="/admin/brand/create" className="float-end text-light">
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
                          to={`/admin/brand/update/${item.id}`}
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

export default Brand;
