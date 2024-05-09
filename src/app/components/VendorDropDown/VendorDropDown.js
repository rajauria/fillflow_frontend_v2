import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVendorValue } from "../../Actions/dropdownValuesActions";

const VendorDropDown = ({ bgColor, height, width, options }) => {
  const dropdownStyle = {
    backgroundColor: bgColor || "white",
    height: height || "3.5vw",
    minHeight: "3.5vw",
    width: width || "auto",

    color: "#838481 ",
    fontSize: "1.1vw",
  };

  const { dropDownMatValue, dropDownVendorValue } = useSelector(
    (state) => state.dropdown
  );
  console.log("dropDownMatValue===", dropDownMatValue, dropDownVendorValue);

  const dispatch = useDispatch();

  const handleVendorChange = (event) => {
    const selectedVendorId = event.target.value;
    dispatch(getVendorValue(selectedVendorId));
  };

  const sortedOptions = [...options].sort((a, b) => {
    return a.vendor_name.localeCompare(b.vendor_name);
  });
  return (
    <select
      style={dropdownStyle}
      className="w-full text-[#838481] font-medium px-4 py-[1vw] rounded-lg leading-tight focus:outline-none"
      onChange={handleVendorChange}
    >
      <option value="">Select Vendor</option>
      {sortedOptions.map((vendor) => (
        <option key={vendor._id} value={vendor._id}>
          {vendor.vendor_name}
        </option>
      ))}
    </select>
  );
};

export default VendorDropDown;
