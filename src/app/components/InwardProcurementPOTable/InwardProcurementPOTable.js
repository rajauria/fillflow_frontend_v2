"use client";
import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import { poServices } from "../../services/poService";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import { useRouter } from "next/navigation";

const InwardProcurementPOTable = () => {
  const { allPO, loading, error } = useSelector((state) => state.po);
  const [openIndex, setOpenIndex] = useState(null);

  const router = useRouter();

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const upatePoStatus = async (poId) => {
    try {
      const response = await poServices.updatePoStatus(poId, {
        status: "fulfilled",
      });
      if (response.success === true) {
        console.log("trigger====");
        window.location.reload();
      }

      return response;
    } catch (error) {
      // Handle error
      console.error("Error updating PO status:", error);
    }
  };

  //   {
  //     "_id": "66392222ff05dc7f8ba632c8",
  //     "grn_number": "164572",
  //     "po_number": "SHRE/PO/5/7/2024",
  //     "vendor_id": "66391967d842cddbbb430a6c",
  //     "warehouse_id": "6638aa2c0478cbe92099a924",
  //     "raw_material_id": "66391f0fe08bdbf76a91ace7",
  //     "quantity": 50,
  //     "unit_price": 600,
  //     "total_amount": 30000,
  //     "status": "fulfilled",
  //     "order_date_time": "2024-05-06T18:32:02.896Z",
  //     "createdAt": "2024-05-06T18:32:02.922Z",
  //     "updatedAt": "2024-05-07T09:08:02.556Z",
  //     "__v": 0
  // }

  //   {
  //     "_id": "66391967d842cddbbb430a6c",
  //     "vendor_name": "Shree Maruti",
  //     "vendor_address": "Q3/145 , Agra",
  //     "vendor_phone": "+919399160227",
  //     "vendor_email": "nikhil@gmail.com",
  //     "vendor_website": "www.xyz.com",
  //     "createdAt": "2024-05-06T17:54:47.909Z",
  //     "updatedAt": "2024-05-06T17:54:47.909Z",
  //     "__v": 0
  // }

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
              RAW MATERIAL NAME
            </th>
            <th scope="col" class="px-6 py-3">
              GRN
            </th>
            <th scope="col" class="px-6 py-3">
              PO NUMBER
            </th>
            <th scope="col" class="px-6 py-3">
              VENDOR NAME
            </th>
            <th scope="col" class="px-6 py-3">
              QUANTITY
            </th>
            <th scope="col" class="px-6 py-3">
              RAISED BY
            </th>
            <th scope="col" class="px-6 py-3">
              CREATED AT
            </th>
          </tr>
        </thead>
        {allPO?.length > 0 ? (
          <tbody>
            {allPO.map((po, index) => (
              <tr
                id={index}
                class={`${
                  po.status === "fulfilled" ? "bg-green-100" : "bg-white"
                }   border-b-[0.15vw]  border-dashed border-[rgb(248,246,242)]  dark:border-[rgb(248,246,242)] hover:bg-gray-50 `}
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
                  {po?.raw_material_id?.material_name}
                </th>
                <td className="px-6 py-4">{po?.grn_number}</td>
                <td className="px-6 py-4">{po?.po_number}</td>
                <td className="px-6 py-4">{po?.vendor_id?.vendor_name}</td>
                <td className="px-6 py-4">{po?.quantity}</td>
                <td className="px-6 py-4">
                  {po?.created_by?.firstName} {po?.created_by?.lastName}
                </td>
                <td className="px-6 py-4">
                  {moment(po?.createdAt).format("DD MMM YYYY")}
                </td>
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
                            onClick={() => upatePoStatus(po._id)}
                            href="#"
                            className="block px-4 py-2 text-sm font-medium text-[rgb(144,138,129)] hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Fulfill
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

export default InwardProcurementPOTable;
