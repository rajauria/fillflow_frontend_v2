"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { rawMaterialServices } from "../../services/rawMaterialService";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMaterialRequest,
  getAllMaterialSuccess,
  getAllMaterialFailure,
} from "../../Actions/materialActions";
import InventoryLevelTable from "@/app/components/InventoryLevelTable/InventoryLevelTable";
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

  const getAllMaterial = async () => {
    try {
      dispatch(getAllMaterialRequest());
      const response = await rawMaterialServices.getAllRawMaterials();
      if (response.success === true) {
        dispatch(getAllMaterialSuccess(response.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllMaterial();
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
          Warehouse Inventory Level
        </span>
        <div className="mt-[0.3vw]">
          <InventoryLevelTable />
        </div>
      </div>
    </div>
  );
};

export default page;
