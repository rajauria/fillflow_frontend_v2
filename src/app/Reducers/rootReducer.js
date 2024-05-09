import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { poReducer } from "./poReducer";
import { vendorReducer } from "./vendoReducer";
import { categoryReducer } from "./categoryReducer";
import { materialReducer } from "./materialReducer";
import { dropValueReducer } from "./dropDownValueReducer";
import { batchReducer } from "./batchReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  po: poReducer,
  vendor: vendorReducer,
  category: categoryReducer,
  material: materialReducer,
  dropdown: dropValueReducer,
  batch: batchReducer,
});
