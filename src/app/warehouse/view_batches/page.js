"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { batchServices } from "@/app/services/batchService";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBatchRequest,
  getAllBatchSuccess,
  getAllBatchFailure,
} from "../../Actions/batchActions";

import ViewBatchTable from "@/app/components/ViewBatchTable/ViewBatchTable";

const page = () => {
  const { selectedRawMaterialId } = useSelector((state) => state.batch);

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

  const getAllBatches = async () => {
    try {
      dispatch(getAllBatchRequest());
      const response = await batchServices.getAllBatches(selectedRawMaterialId);
      if (response.success === true) {
        dispatch(getAllBatchSuccess(response.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllBatches();
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
          Inward procurement PO
        </span>
        <div className="mt-[0.3vw]">
          <ViewBatchTable />
        </div>
      </div>
    </div>
  );
};

export default page;
