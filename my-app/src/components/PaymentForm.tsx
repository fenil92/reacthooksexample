import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/paymentActionCreator';
import { PaymentDetail } from "../models/paymentDetail";

export const PaymentForm = () => {
  const { register, handleSubmit, formState: { errors, isValid, isDirty }, reset } = useForm({
    mode: "onChange"
  });
  const dispatch = useDispatch();
  const {postPaymentDetail} = bindActionCreators(actionCreators,dispatch);
  
  const onSubmit = (data:PaymentDetail) => {
    console.log(data);
    if(!data.paymentId){
      postPaymentDetail(data);
    }
    reset();
  };

  return (
      
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("paymentDetailId")}/>
          <div className="form-group p-1">
            <label htmlFor="fullname">CARD OWNER NAME</label>
            <input
            {...register("cardOwnerName", { required: true })}
              className="form-control"
              type="text"
              placeholder="Full Name"
              id="fullname"
            />
            {errors.cardOwnerName && <span className="text-danger">This field is required</span>}
          </div>
          <div className="form-group p-1">
            <label htmlFor="cardnumber">CARD NUMBER</label>
            <input
            {...register("cardNumber", { required: true, maxLength: 16 , minLength:16})}
              className="form-control"
              type="text"
              placeholder="16 Digit Card Number"
              id="cardnumber"
              maxLength={16}
            />
            {errors.cardNumber && <span className="text-danger">This field is required</span>}
          </div>
          <div className="form-row d-flex p-1">
            <div className="form-group col-md-6 p-1">
              <label htmlFor="scode">SECURITY CODE</label>
              <input
                className="form-control"
                type="number"
                placeholder="Security Code"
                id="scode"
                {...register("securityCode", { required: true,  maxLength: 3, minLength: 3})}
              />
              {errors.securityCode && <span className="text-danger">Should be exactly 3 digits</span>}
            </div>
            <div className="form-group col-md-6 p-1">
              <label htmlFor="expDate">VALID THROUGH</label>
              <input
                className="form-control"
                type="text"
                placeholder="MM/YY"
                id="expDate"
                {...register("expirationDate", { required: true })}
              />
            </div>
          </div>
          <div className="form-group d-grid p-1">
            <button className="btn btn-success" type="submit" 
            // disabled={!isDirty || !isValid}
            >
              Submit
            </button>
          </div>
        </form>
    
  );
}


