import React, { useEffect, useState } from "react";
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import toast from "react-hot-toast";

const Checkout = ({ planDetails, setErrorOccurred }) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency || "USD");
  let userData = {};
  
  useEffect(() => {
    userData = localStorage.getItem("user") || {};
  },[]);
  
  console.log({paypal_clientid: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID});
  function generateCustomId(brokerId, planId) {
    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "");
    const timestamp = currentDate.getTime();
    const customId = `${brokerId}-${planId}-${formattedDate}-${timestamp}`;

    return customId;
  }
  const onCurrencyChange = ({ target: { value } }) => {
    setCurrency(value);
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: value,
      },
    });
  };

  const onCreateOrder = (data, actions) => {
    return actions.order.create({
        intent: "CAPTURE",
      purchase_units: [
        {
          description: `Broker ${planDetails?.title} Subscription Plan`,
          custom_id: generateCustomId(userData?.userId, planDetails?.id),
        //   soft_descriptor: `RealEstateBrokerSub${planDetails?.title}Plan`,
          amount: {
            value: planDetails?.price,
            currency_code: currency,
            breakdown: {
              item_total: {
                value: planDetails?.price,
                currency_code: currency,
              },
              tax_total: {
                value: "0.00",
                currency_code: currency,
              },
            },
          },
          items: [
            {
              name: `Subscription ${planDetails?.title} Plan`,
              quantity: "1",
              unit_amount: {
                value: planDetails?.price,
                currency_code: currency,
              },
              description: "Monthly subscription for listing properties",
              category: "DIGITAL_GOODS",
            },
          ],
        },
      ],
      application_context: {
        brand_name: userData?.broker_Details?.companyName,
        locale: "en-US",
        user_action: "PAY_NOW",
        shipping_preference: "NO_SHIPPING",
      },
    });
  };

  const onApproveOrder = (data, actions) => {
    return actions.order.capture().then((details) => {
      toast.success(`Transaction completed.`);
      const payload = {
        payerUserId: userData?.userId,
        planId: planDetails?.id,
        orderCapturedDetails: details,
      };
      console.log({payload})
      //save this payload to the DB
    });
  };

  const onCancelOrder = (data) => {
    setErrorOccurred(true);
  };

  const onError = (err) => {
    console.error("PayPal Error:", err); 
    setErrorOccurred(true);
  };

  return (
    <div className="checkout">
      {isPending ? (
        <p>LOADING...</p>
      ) : (
        <>
          <label htmlFor="currency-selector">Select Currency:</label>
          <select
            id="currency-selector"
            value={currency}
            onChange={onCurrencyChange}
          >
            <option value="USD">💵 USD (US Dollar)</option>
            <option value="CAD">🇨🇦 CAD (Canadian Dollar)</option>
          </select>
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={onCreateOrder}
            onApprove={onApproveOrder}
            onCancel={onCancelOrder} // Handle canceled transactions
            onError={onError} // Handle errors
          />
        </>
      )}
    </div>
  );
};

// Wrap the Checkout component with PayPalScriptProvider
const CheckoutPage = ({ planDetails,setErrorOccurred}) => (
  <PayPalScriptProvider
    options={{
      "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
      currency: "USD", 
    }}
  >
    <Checkout planDetails={planDetails} setErrorOccurred={setErrorOccurred}/>
  </PayPalScriptProvider>
);

export default CheckoutPage;
