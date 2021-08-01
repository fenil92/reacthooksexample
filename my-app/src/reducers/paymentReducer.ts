import {
  ADD_PAYMENT_DETAILS,
  DELETE_PAYMENT_DETAILS,
  FETCH_PAYMENT_DETAILS,
  FETCH_PAYMENT_FAILURE,
  FETCH_PAYMENT_SUCCESS,
  SET_ACTIVE_PAGE,
} from "../actions/paymentActionTypes";
import { PaymentDetail } from "../models/paymentDetail";

interface PaymentState {
  loading: boolean;
  data: PaymentDetail[];
  error: string;
  activePage: number;
  activePageData: PaymentDetail[];
}

const initialState: PaymentState = {
  loading: false,
  data: [],
  error: "",
  activePage:1,
  activePageData: []
};

const initialPageSize= 3;

const paginate =(array: Array<any>, page_size: number = initialPageSize, page_number: number) => {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

const PaymentReducer = (
  state: PaymentState = initialState,
  action: any
): PaymentState => {
  switch (action.type) {
    case FETCH_PAYMENT_DETAILS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: ""
      };
    case FETCH_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    case ADD_PAYMENT_DETAILS:
      const payments = state.data.concat(action.payload);
      return {
        ...state,
        data: payments,
      };
    case DELETE_PAYMENT_DETAILS:
      return {
        ...state,
        data: state.data.filter((x) => x.paymentId !== action.payload),
      };
    case SET_ACTIVE_PAGE:
      const paginatedData = paginate(state.data, initialPageSize, action.payload)
      return{
        ...state,
        activePage: action.payload,
        activePageData: paginatedData
      }
    default:
      return state;
  }
};

export default PaymentReducer;
