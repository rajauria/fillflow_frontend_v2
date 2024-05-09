"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import RaiseStoragePOTable from "../../components/RaiseStoragePOTable/RaiseStoragePOTable";
import { poServices } from "../../services/poService";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPoRequest,
  getAllPoSuccess,
  getAllPoFailure,
} from "../../Actions/poActions";

const page = () => {
  const dispatch = useDispatch();
  const items = [
    {
      id: 1,
      label: "Procurement Team",
      subItems: [
        {
          id: 11,
          label: "Create vendor PO",
          path: "/procurement/raise_vendor_po",
        },
      ],
    },
    {
      id: 2,
      label: "Warehouse Team",
      subItems: [
        {
          id: 21,
          label: "Inward procurement PO",
          path: "/warehouse/inward_procurement_po",
        },
        {
          id: 22,
          label: "Storage inventory level",
          path: "/warehouse/inventory_level",
        },
      ],
    },
  ];

  const getAllPos = async () => {
    try {
      dispatch(getAllPoRequest());
      const response = await poServices.getAllPo();
      if (response.success === true) {
        dispatch(getAllPoSuccess(response.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllPos();
  }, []);

  return (
    <div className="flex w-full h-screen  flex-row gap-4">
      <div className="w-[23vw]">
        <Sidebar items={items} />
      </div>

      <div className="flex flex-col w-[77vw] ">
        <div className="flex leading-tight mt-[2.5vw] flex-col">
          <span className="font-semibold text-[1.6vw] ">Fillflow Portal</span>
          <span className="text-[1.1vw] font-medium text-[rgb(181,176,161)]">
            A inventory management system
          </span>
        </div>
        <span className="mt-[1.2vw] text-[1.4vw] font-semibold">
          Raise vendor PO
        </span>
        <div className="mt-[0.3vw]">
          <RaiseStoragePOTable />
        </div>
      </div>
    </div>
  );
};

export default page;
