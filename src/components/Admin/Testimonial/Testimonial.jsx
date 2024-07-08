import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Breadcrum from "../../Breadcrum";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTestimonial,
  getTestimonial,
} from "../../../Store/ActionCreators/TestimonialActionCreators";

const Testimonial = () => {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const TestimonialStateData = useSelector(
    (state) => state.TestimonialStateData
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
      field: "pic",
      headerName: "Pic",
      width: 150,
      editable: false,
      renderCell: ({ row }) => (
        <a href={`/img/${row.pic}`} target="_blank" rel="noreferrer">
          <img src={`/img/${row.pic}`} height={50} width={50} />
        </a>
      ),
    },
    {
      field: "star",
      headerName: "Star",
      width: 50,
      editable: true,
    },
    {
      field: "message",
      headerName: "Message",
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
          to={`/admin/Testimonial/update/${row.id}`}
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
      dispatch(deleteTestimonial({ id: id }));
      getAPIData();
    }
  }

  // fetching data from backend API
  function getAPIData() {
    dispatch(getTestimonial());

    if (TestimonialStateData.length) {
      setData(TestimonialStateData);
    }
  }

  // showing it once on admin testimonial page
  useEffect(() => {
    getAPIData();
  }, [TestimonialStateData.length]);

  return (
    <>
      <Breadcrum title="Admin"></Breadcrum>

      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <Sidebar />
          </div>
          <div className="col-9">
            <h5 className="bg-primary text-light text-center p-2">
              Testimonial
              <Link
                to="/admin/testimonial/create"
                className="float-end text-light"
              >
                <i className="fa fa-plus"></i>
              </Link>
            </h5>

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

export default Testimonial;
