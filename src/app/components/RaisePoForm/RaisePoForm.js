import React, { useEffect, useState } from "react";
import VendorDropDown from "../VendorDropDown/VendorDropDown";
import CategoryDropdown from "../CategoryDropdown/CategoryDropdown";
import Input from "../Input/Input";
import { vendorServices } from "@/app/services/vendorService";
import { categoryServices } from "@/app/services/categoryService";
import { rawMaterialServices } from "@/app/services/rawMaterialService";
import { poServices } from "../../services/poService";
import {
  getAllVendorRequest,
  getAllVendorFailure,
  getAllVendorSuccess,
} from "../../Actions/vendorActions";
import {
  getAllCategorySuccess,
  getAllCategoryRequest,
  getAllCategoryFailure,
} from "../../Actions/categoryActions";
import {
  getAllMaterialByCatIdRequest,
  getAllMaterialByCatIdSuccess,
  getAllMaterialByCatIdFailure,
} from "../../Actions/materialActions";
import { useDispatch, useSelector } from "react-redux";
import RawMateialDropDown from "../RawMateialDropDown/RawMateialDropDown";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";

const RaisePoForm = () => {
  const { allVendors } = useSelector((state) => state.vendor);
  const { allCategories, selectedCatId } = useSelector(
    (state) => state.category
  );
  const { allMaterialsByCatId } = useSelector((state) => state.material);
  const { dropDownMatValue, dropDownVendorValue } = useSelector(
    (state) => state.dropdown
  );
  const { userInfo } = useSelector((state) => state.auth);
  const router = useRouter();
  console.log("userInfo===", userInfo);
  console.log("dropDownMatValue===", dropDownMatValue);
  console.log("dropDownVendorValue===", dropDownVendorValue);

  const [formData, setFormData] = useState({
    warehouse_id: null,
    vendor_id: null,
    raw_material_id: null,
    quantity: null,
    unit_price: null,
  });

  useEffect(() => {
    // Update formData when dropDownMatValue or dropDownVendorValue changes
    setFormData({
      vendor_id: dropDownVendorValue,
      raw_material_id: dropDownMatValue,
      quantity: formData.quantity,
      unit_price: formData.unit_price,
    });
  }, [dropDownMatValue, dropDownVendorValue]);
  console.log("formData====", formData);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getAllVendorData = async () => {
    try {
      dispatch(getAllVendorRequest());
      const response = await vendorServices.getAllVendors();
      if (response.success === true) {
        dispatch(getAllVendorSuccess(response.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllCategories = async () => {
    try {
      dispatch(getAllCategoryRequest());

      const response = await categoryServices.getAllCategories();
      if (response.success === true) {
        dispatch(getAllCategorySuccess(response.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getRawMaterialByCatId = async () => {
    try {
      dispatch(getAllMaterialByCatIdRequest());
      const response = await rawMaterialServices.getAllRawMaterialsByCatId(
        selectedCatId
      );
      if (response.success === true) {
        dispatch(getAllMaterialByCatIdSuccess(response.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createNewPO = async () => {
    try {
      const response = await poServices.createPO(formData);
      console.log("response===", response);
      if (response.success === true) {
        router.push("/procurement/raise_vendor_po");
      }
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRawMaterialByCatId();
  }, [selectedCatId]);

  useEffect(() => {
    getAllVendorData();
    getAllCategories();
  }, []);

  return (
    <div>
      <div className="flex flex-col">
        <label>Vendor</label>
        <VendorDropDown bgColor={"#F8F6F2"} options={allVendors} />
      </div>
      <div className="flex flex-col">
        <label>Category</label>
        <CategoryDropdown bgColor={"#F8F6F2"} options={allCategories} />
      </div>
      <div className="flex flex-col">
        <label>Product</label>
        <RawMateialDropDown bgColor={"#F8F6F2"} options={allMaterialsByCatId} />
      </div>
      <div className="flex flex-col">
        <label>Quantity</label>
        <Input
          bgColor={"bg-[#F8F6F2]"}
          radius={"rounded-lg"}
          height={"h-[3.5vw] min-h-[3.5vh]"}
          padding={"p-[1vw]"}
          type={"number"}
          color={"text-[#838481]"}
          textSize={"text-[1vw]"}
          fontWeight={"font-medium"}
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col">
        <label>Unit Price</label>
        <Input
          bgColor={"bg-[#F8F6F2]"}
          radius={"rounded-lg"}
          height={"h-[3.5vw] min-h-[3.5vh]"}
          padding={"p-[1vw]"}
          type={"number"}
          color={"text-[#838481]"}
          textSize={"text-[1vw]"}
          fontWeight={"font-medium"}
          name="unit_price"
          value={formData.unit_price}
          onChange={handleChange}
        />
      </div>
      <div onClick={createNewPO}>
        <Button
          title={"Raise Po"}
          bgColor={"bg-[rgb(79,201,218)]"}
          radius={"rounded-lg"}
          height={"h-[3vw] min-h-[3vh]"}
          padding={"p-[1vw]"}
          color={"text-[#ffff]"}
          textSize={"text-[1vw]"}
          fontWeight={"font-medium"}
          width={"w-[7vw]"}
        />
      </div>
    </div>
  );
};

export default RaisePoForm;
