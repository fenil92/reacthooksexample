import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { PaymentForm } from "./components/PaymentForm";
import { Provider } from "react-redux";
import { store } from "./state/store";
import PaymentList from "./components/PaymentList";

function App() {
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
            <PaymentForm />
          </div>
          <div className="col-md-4">
            <PaymentList />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
