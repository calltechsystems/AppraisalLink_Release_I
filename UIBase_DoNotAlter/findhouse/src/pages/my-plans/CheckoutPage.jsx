import React, { useEffect, useState } from "react";
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import toast from "react-hot-toast";

const Checkout = ({ planDetails, setErrorOccurred, setOnSuccess }) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency || "USD");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")) || {});
  }, [planDetails]);

  const generateCustomId = (brokerId, planId) => {
    if (!brokerId || !planId) {
      console.error("Missing brokerId or planId");
      return "invalid-id";
    }
    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "");
    const timestamp = currentDate.getTime();
    return `${brokerId}-${planId}-${formattedDate}-${timestamp}`;
  };

  function getNextMonthDateWithYearCheck() {
    const currentDate = new Date();

    const nextMonthDate = new Date(currentDate);
    nextMonthDate.setMonth(currentDate.getMonth() + 1);

    return nextMonthDate;
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
        brand_name: userData?.broker_Details?.companyName || "My Business",
        locale: "en-US",
        user_action: "PAY_NOW",
        shipping_preference: "NO_SHIPPING",
      },
    });
  };

  const generateTheTransactionPayload = (details) => {
    return {
      transactionDetails: {
        transaction_detail: details,
        user_id: userData?.userId,
        created_time: details?.create_time,
        plan_amount: planDetails?.price,
        plan_name: planDetails?.title,
        Is_Active: true,
        start_date: new Date(),
        end_date: getNextMonthDateWithYearCheck(),
        used_properties: 0,
        no_of_properties: planDetails?.item?.noOfProperties,
        total_properties: planDetails?.item?.noOfProperties,
      },
      subscriptionDetails: {
        start_date: new Date(),
        end_date: getNextMonthDateWithYearCheck(),
        plan_id: planDetails?.id,
        total_properties: planDetails?.item?.noOfProperties,
        used_properties: 0,
        user_id: userData?.userId,
      },
    };
  };

  const onApproveOrder = (data, actions) => {
    return actions.order.capture().then((details) => {
      const payload = generateTheTransactionPayload(details);
      console.log({ payload });
      //save this payload to the DB
      setOnSuccess(true);
    });
  };

  const onCancelOrder = (data) => {
    console.error("PayPal On Cancel data:", data);
    setErrorOccurred(true);
  };

  const onError = (err) => {
    console.error("PayPal On Error data:", err);
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
const CheckoutPage = ({ planDetails, setErrorOccurred, setOnSuccess }) => (
  <PayPalScriptProvider
    options={{
      "client-id":
        "AR1CYFbM_D9uUk9mRvFJSsJHTdny-Lddd_tKSVtFUeSK7r-M2dJeEIR6PA5TIkpIr8keinWycBpiikvh",
      // "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
      currency: "USD",
    }}
  >
    <Checkout planDetails={planDetails} setErrorOccurred={setErrorOccurred} setOnSuccess={setOnSuccess}/>
  </PayPalScriptProvider>
);

export default CheckoutPage;
