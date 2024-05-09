"use client";
import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import { rawMaterialServices } from "../../services/rawMaterialService";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMaterialRequest,
  getAllMaterialSuccess,
  getAllMaterialFailure,
} from "../../Actions/materialActions";
import { setRawMaterialIdBatch } from "../../Actions/batchActions";
import { useRouter } from "next/navigation";

const InventoryLevelTable = () => {
  const { allMaterials } = useSelector((state) => state.material);
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState(null);
  const dispatch = useDispatch();
  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const setRawMaterialId = (raw_material_Id) => {
    console.log("raw_material_Id===", raw_material_Id);
    dispatch(setRawMaterialIdBatch(raw_material_Id));
    router.push("/warehouse/view_batches");
  };

  return (
    <div class="relative overflow-x-auto  mr-[1vw]  sm:rounded-lg">
      <div class="p-[2vw] flex justify-between border-[0.15vw] bg-[rgb(253,252,251)] border-dashed border-[rgb(248,246,242)]  dark:border-[rgb(248,246,242)]  ">
        {/* search item button */}
        <div>
          <label for="table-search" class="sr-only">
            Search
          </label>
          <div class="relative mt-1">
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className=" flex p-[0.5vw] ps-10 text-sm text-gray-900 border focus:outline-none border-gray-300 rounded-lg w-80 bg-gray-50   dark:border-gray-600 dark:placeholder-gray-400  "
              placeholder="Search for items"
            />
          </div>
        </div>
        {/* po raise button */}
        {/* <div>
          <Button
            title={"PO Raise"}
            bgColor={"bg-[rgb(79,201,218)]"}
            radius={"rounded-lg"}
            height={"h-[3vw] min-h-[3vh]"}
            padding={"p-[1vw]"}
            color={"text-[#ffff]"}
            textSize={"text-[1vw]"}
            fontWeight={"font-medium"}
            width={"w-[7vw]"}
          />
        </div> */}
      </div>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase border-b-[0.15vw] border-dashed border-[rgb(248,246,242)]  dark:text-gray-400">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded     dark:bg-gray-700 dark:border-gray-600"
                />
                <label for="checkbox-all-search" class="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" class="px-6 py-3">
              MATERIAL NAME
            </th>
            <th scope="col" class="px-6 py-3">
              CATEGORY
            </th>
            <th scope="col" class="px-6 py-3">
              CURRENT STOCK
            </th>
            <th scope="col" class="px-6 py-3">
              ACTIONS
            </th>
          </tr>
        </thead>
        {allMaterials?.length > 0 ? (
          <tbody>
            {allMaterials.map((material, index) => (
              <tr
                id={index}
                class="bg-white border-b-[0.15vw]  border-dashed border-[rgb(248,246,242)]  dark:border-[rgb(248,246,242)] hover:bg-gray-50 "
              >
                <td class="w-4 p-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-table-search-1" class="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-[rgb(153,142,125)] whitespace-nowrap "
                >
                  {material?.material_name}
                </th>
                <td class="px-6 py-4">
                  {material?.material_category_id?.category_name}
                </td>
                <td class="px-6 py-4">{material?.current_stock}</td>
                <td>
                  <button
                    id="dropdownHoverButton"
                    className={`${
                      openIndex === index
                        ? "bg-[rgb(216,241,247)] text-[rgb(79,202,220)]"
                        : "text-[rgb(144,138,129)] bg-[rgb(248,246,242)]"
                    }   hover:bg-[rgb(216,241,247)] hover:text-[rgb(79,202,220)] focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center `}
                    type="button"
                    onClick={() => toggleDropdown(index)}
                  >
                    Action
                    <svg
                      class="w-2.5 h-2.5 ms-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  {openIndex === index && (
                    <div
                      id="dropdownHover"
                      className="z-1000 absolute min-w-24 max-w-24 bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700"
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownHoverButton"
                      >
                        <li>
                          <a
                            onClick={() => setRawMaterialId(material?._id)}
                            href="#"
                            className="block px-4 py-2 text-sm font-medium text-[rgb(144,138,129)] hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            View Batches
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <div>loading.....</div>
        )}
      </table>
    </div>
  );
};

export default InventoryLevelTable;
