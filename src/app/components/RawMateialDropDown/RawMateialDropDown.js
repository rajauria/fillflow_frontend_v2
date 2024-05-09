"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMatValue } from "../../Actions/dropdownValuesActions";

const RawMateialDropDown = ({ bgColor, height, width, options }) => {
  const dropdownStyle = {
    backgroundColor: bgColor || "white",
    height: height || "3.5vw",
    minHeight: "3.5vw",
    width: width || "auto",
    color: "#838481 ",
    fontSize: "1.1vw",
  };
  const dispatch = useDispatch();

  const handleMaterialChange = (event) => {
    const selectedMatValue = event.target.value;
    console.log("selectedMatValue===", selectedMatValue);
    dispatch(getMatValue(selectedMatValue));
  };

  const sortedOptions = [...options].sort((a, b) => {
    return a.material_name.localeCompare(b.material_name);
  });

  return (
    <select
      style={dropdownStyle}
      className="w-full text-[#838481] font-medium px-4 py-[1vw] rounded-lg leading-tight focus:outline-none"
      onChange={handleMaterialChange}
    >
      <option value="">Select Product</option>

      {sortedOptions.map((material) => (
        <option
          className="text-[#838481] py-[1vw] text-[1.1vw] font-medium"
          key={material._id}
          value={material._id}
        >
          {material.material_name}
        </option>
      ))}
    </select>
  );
};

export default RawMateialDropDown;
