import {
  GET_CATEGORY_VALUE,
  GET_MATERIAL_VALUE,
  GET_VENDOR_VALUE,
} from "../constants/dropDownValuesConstants";

const initialState = {
  dropDownCatValue: "",
  dropDownMatValue: "",
  dropDownVendorValue: "",
};

export const dropValueReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY_VALUE:
      return {
        ...state,
        dropDownCatValue: action.payload,
      };

    case GET_MATERIAL_VALUE:
      return {
        ...state,
        dropDownMatValue: action.payload,
      };

    case GET_VENDOR_VALUE:
      return {
        ...state,
        dropDownVendorValue: action.payload,
      };

    default:
      return state;
  }
};
