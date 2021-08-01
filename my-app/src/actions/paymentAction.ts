import { PaymentDetail } from "../models/paymentDetail"
import { ADD_PAYMENT_DETAILS, DELETE_PAYMENT_DETAILS, FETCH_PAYMENT_DETAILS, FETCH_PAYMENT_FAILURE, FETCH_PAYMENT_SUCCESS, SET_ACTIVE_PAGE } from "./paymentActionTypes"

export const fetchPaymentRequest = () => {
    return {
        type: FETCH_PAYMENT_DETAILS
    }
}

export const fetchPaymentSuccess = (payments: PaymentDetail[]) => {
    return {
        type: FETCH_PAYMENT_SUCCESS,
        payload: payments
    }
}

export const fetchPaymentFailure = (error: string) => {
    return {
        type: FETCH_PAYMENT_FAILURE,
        payload: error
    }
}

export const AddPaymentAction = (payment: PaymentDetail) => {
    return {
        type: ADD_PAYMENT_DETAILS,
        payload: payment
    }
}

export const DeletePaymentAction = (paymentId: number) => {
    return {
        type: DELETE_PAYMENT_DETAILS,
        payload: paymentId
    }
}

export const SetActivePageAction = (pageNumber: number) => {
    return {
        type: SET_ACTIVE_PAGE,
        payload: pageNumber
    }
}