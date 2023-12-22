import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthContextProvider } from "./authContext/AuthContext.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  clientId:
    "AdSMl5qxqvbN4NGpZuSANvop-cK9JCiHuF89yi9rSTn5DSYEc2fYCU4HTJnpoYiVQRaNeCYbHnaOZH5z",
  currency: "USD",
  intent: "capture",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PayPalScriptProvider options={initialOptions}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </PayPalScriptProvider>
  </React.StrictMode>
);
