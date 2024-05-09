import {
  GET_CATEGORY_VALUE,
  GET_VENDOR_VALUE,
  GET_MATERIAL_VALUE,
} from "../constants/dropDownValuesConstants";

export const getCatValue = (value) => {
  return {
    type: GET_CATEGORY_VALUE,
    payload: value,
  };
};

export const getVendorValue = (value) => {
  return {
    type: GET_VENDOR_VALUE,
    payload: value,
  };
};

export const getMatValue = (value) => {
  return {
    type: GET_MATERIAL_VALUE,
    payload: value,
  };
};
