import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { PaymentForm } from "./components/PaymentForm";
import { Provider } from "react-redux";
import { store } from "./state/store";
import PaymentList from "./components/PaymentList";
import { PaymentDetail } from "./models/paymentDetail";

const initialFormState : PaymentDetail = {
  cardNumber: undefined,
  cardOwnerName: '',
  expirationDate: undefined,
  paymentId: 0,
  securityCode: undefined
}

function App() {
  const [formData, setFormData] = useState(initialFormState);

  const handleFormUpdate = (detail: PaymentDetail) => {
    console.log(detail);
    setFormData(detail);
  }

  return (
    <Provider store={store}>
      <div className="container">
        <header>
          <h1 className="text-center">
            <span className="badge bg-secondary">Payment Details</span>
          </h1>
        </header>
        <div className="row mx-auto">
          <div className="col-md-4 offset-1">
            <PaymentForm details={formData} />
          </div>
          <div className="col-md-4">
            <PaymentList handleFormUpdate={handleFormUpdate}/>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
