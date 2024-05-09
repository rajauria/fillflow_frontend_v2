import {
  GET_ALL_PO_REQUEST,
  GET_ALL_PO_SUCCESS,
  GET_ALL_PO_FAILURE,
  UPDATE_PO_REQUEST,
  UPDATE_PO_SUCCESS,
  UPDATE_PO_FAILURE,
} from "../constants/poConstants";

const initialState = {
  loading: false,
  allPO: [],
  error: null,
};

export const poReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PO_REQUEST:
      return { ...state, loading: true, error: null, message: action.payload };

    case GET_ALL_PO_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        allPO: action.payload,
        error: null,
      };

    case GET_ALL_PO_FAILURE:
      return { ...state, loading: false, error: action.payload, message: null };

    default:
      return state;
  }
};
