import { useEffect, useState } from "react";
import Breadcrum from "../../Breadcrum";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { getCheckout } from "../../../Store/ActionCreators/CheckoutActionCreators";

function CheckoutQueries() {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const CheckoutStateData = useSelector((state) => state.CheckoutStateData);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "userid",
      headerName: "User Id",
      width: 90,
      editable: true,
    },
    {
      field: "orderstatus",
      headerName: "Order Status",
      width: 130,
      editable: true,
    },
    {
      field: "paymentstatus",
      headerName: "Payment Status",
      width: 110,
      editable: false,
    },
    {
      field: "subtotal",
      headerName: "Subtotal",
      width: 100,
      editable: true,
      renderCell: ({ row }) => <p>&#8377;{row.subtotal}</p>,
    },
    {
      field: "shipping",
      headerName: "Shipping",
      width: 60,
      editable: true,
      renderCell: ({ row }) => <p>&#8377;{row.shipping}</p>,
    },
    {
      field: "total",
      headerName: "Total",
      width: 60,
      editable: true,
      renderCell: ({ row }) => <p>&#8377;{row.total}</p>,
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
          to={`/admin/checkouts/show/${row.id}`}
          className="btn btn-primary"
        >
          <i className="fa fa-eye"></i>
        </Link>
      ),
    },
  ];

  function getAPIData() {
    dispatch(getCheckout());
    if (CheckoutStateData.length) {
      setData(CheckoutStateData);
    }
  }

  useEffect(() => {
    getAPIData();
  }, [CheckoutStateData.length]);
  return (
    <>
      <Breadcrum title="Checkout" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <Sidebar />
          </div>
          <div className="col-9">
            <h5 className="bg-primary text-light text-center p-2">Checkout</h5>
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

export default CheckoutQueries;
