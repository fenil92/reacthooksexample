import axios from 'axios';
import { PaymentDetail } from '../models/paymentDetail';
import { AddPaymentAction, DeletePaymentAction, fetchPaymentFailure, fetchPaymentRequest, fetchPaymentSuccess, SetActivePageAction, UpdatePaymentAction } from './paymentAction';
const baseUri = "http://localhost:5000/api/Paymentdetails"

export const fetchPaymentList = () => {
    return (dispatch: any) => {
        dispatch(fetchPaymentRequest);
        axios.get(baseUri)
        .then(response => {
            const data = response.data;
            dispatch(fetchPaymentSuccess(data))
            dispatch(setActivePage(1));
        })
        .catch(error =>{
            const errMessage = error.message;
            dispatch(fetchPaymentFailure(errMessage))
        })
    }
}

export const postPaymentDetail = (paymentDetail: PaymentDetail) => {
    return (dispatch: any) => {
        dispatch(fetchPaymentRequest);
        axios.post(baseUri, 
        JSON.stringify(paymentDetail), {
            headers: { 
                'Content-Type' : 'application/json' 
            }
        })
        .then(response => {
            const data: PaymentDetail = response.data;
            dispatch(AddPaymentAction(data))
        })
        .catch(error =>{
            const errMessage = error.message;
            dispatch(fetchPaymentFailure(errMessage))
        })
    }
}

export const putPaymentDetail = (id:number, paymentDetail: PaymentDetail) => {
    return (dispatch: any) => {
        dispatch(fetchPaymentRequest);
        axios.put(`${baseUri}/${id}`, 
        JSON.stringify(paymentDetail), {
            headers: { 
                'Content-Type' : 'application/json' 
            }
        })
        .then(response => {
            console.log(response);
            if(response.status === 204){
                dispatch(UpdatePaymentAction(paymentDetail))
            }
        })
        .catch(error =>{
            const errMessage = error.message;
            dispatch(fetchPaymentFailure(errMessage))
        })
    }
}

export const deletePaymentDetail = (id: number, currentPage: number) => {
    return (dispatch: any) => {
        dispatch(fetchPaymentRequest);
        axios.delete(`${baseUri}/${id}`)
        .then(response => {
            const data: PaymentDetail = response.data;
            dispatch(DeletePaymentAction(data.paymentId!))
            dispatch(SetActivePageAction(currentPage));
        })
        .catch(error =>{
            const errMessage = error.message;
            dispatch(fetchPaymentFailure(errMessage))
        })
    }
}

export const setActivePage = (pageNumber: number) => {
    return (dispatch: any) => {
       dispatch(SetActivePageAction(pageNumber))
    }
}

