import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import Breadcrum from "../../Breadcrum";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteProduct,
  getProduct,
} from "../../../Store/ActionCreators/ProductActionCreators";
export default function Mainctegory() {
  let [data, setData] = useState([]);

  let dispatch = useDispatch();
  let ProductStateData = useSelector((state) => state.ProductStateData);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "maincategory",
      headerName: "Maincategory",
      width: 100,
      editable: true,
    },
    {
      field: "subcategory",
      headerName: "Subcategory",
      width: 100,
      editable: true,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 100,
      editable: true,
    },
    {
      field: "color",
      headerName: "Color",
      width: 80,
      editable: true,
    },
    {
      field: "size",
      headerName: "size",
      width: 80,
      editable: true,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 100,
      editable: true,
      renderCell: ({ row }) => (
        <span>{row.stock ? "In Stock" : "Out Of Stock"}</span>
      ),
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 70,
      editable: true,
    },
    {
      field: "baseprice",
      headerName: "Base Price",
      width: 100,
      editable: true,
      renderCell: ({ row }) => <span>&#8377;{row.baseprice}</span>,
    },
    {
      field: "discount",
      headerName: "Discount",
      width: 100,
      editable: true,
      renderCell: ({ row }) => <span>{row.discount}%</span>,
    },
    {
      field: "finalprice",
      headerName: "Final Price",
      width: 100,
      editable: true,
      renderCell: ({ row }) => <span>&#8377;{row.finalprice}</span>,
    },
    {
      field: "pic",
      headerName: "Pic",
      width: 500,
      editable: false,
      renderCell: ({ row }) => {
        if (Array.isArray(row.pic)) {
          return row.pic.map((item, index) => {
            return (
              <a
                key={index}
                href={`/img/${item}`}
                target="_blank"
                rel="noreferrer"
              >
                <img src={`/img/${item}`} height={50} width={50} />
              </a>
            );
          });
        }
      },
    },

    {
      field: "edit",
      headerName: "Edit",
      width: 60,
      sortable: false,
      renderCell: ({ row }) => (
        <Link
          to={`/admin/product/update/${row.id}`}
          className="btn btn-primary"
        >
          <i className="fa fa-edit"></i>
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 60,
      sortable: false,
      renderCell: ({ row }) => (
        <button className="btn btn-danger" onClick={() => deleteRecord(row.id)}>
          <i className="fa fa-trash"></i>
        </button>
      ),
    },
  ];
  function deleteRecord(id) {
    if (window.confirm("Are You Sure to Delete that Item : ")) {
      dispatch(deleteProduct({ id: id }));
      getAPIData();
    }
  }
  function getAPIData() {
    dispatch(getProduct());
    if (ProductStateData.length) setData(ProductStateData);
  }
  useEffect(() => {
    getAPIData();
  }, [ProductStateData.length]);
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
              Product{" "}
              <Link to="/admin/product/create" className="float-end text-light">
                <i className="fa fa-plus"></i>
              </Link>
            </h5>
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
