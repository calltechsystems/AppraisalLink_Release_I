import React, { useEffect, useState } from "react";
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import toast from "react-hot-toast";

const Checkout = ({ topUpDetails, setErrorOccurred, setOnSuccess, currentSubscription }) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency || "CAD");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")) || {});
  }, [topUpDetails]);

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
          description: `Broker ${topUpDetails?.title} Top Up Plan`,
          custom_id: generateCustomId(userData?.userId, topUpDetails?.id),
          //   soft_descriptor: `RealEstateBrokerSub${planDetails?.title}Plan`,
          amount: {
            value: topUpDetails?.price,
            currency_code: currency,
            breakdown: {
              item_total: {
                value: topUpDetails?.price,
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
              name: `Top Up ${topUpDetails?.title} Plan`,
              quantity: "1",
              unit_amount: {
                value: topUpDetails?.price,
                currency_code: currency,
              },
              description: "Monthly subscription top up add for listing properties",
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

  // const convertToTimezone = (timestamp, targetTimezone) => {
  //   const date = new Date(timestamp); // Parse the input timestamp
  //   const options = {
  //     timeZone: targetTimezone,
  //     year: 'numeric',
  //     month: 'short',
  //     day: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     second: '2-digit',
  //     hour12: false, // Use 24-hour format
  //   };
  //   return new Intl.DateTimeFormat('en-US', options).format(date);
  // };

  // const canadaTimezone = 'America/Toronto'; // Example timezone for Canada
  // const formattedDate = convertToTimezone(response.timestamp, canadaTimezone);

  const generateTheTransactionPayload = (details) => {
    return {
      transactionDetails: {
        transaction_detail: details,
        user_id: userData?.userId,
        created_time: details?.create_time,
        plan_amount: currentSubscription?.planAmount,
        plan_name: currentSubscription?.planName,
        Is_Active: true,
        start_date: new Date(),
        end_date: getNextMonthDateWithYearCheck(),
        used_properties: currentSubscription?.usedProperties,
        no_of_properties: currentSubscription?.noOfProperties,
        total_properties: currentSubscription?.noOfProperties,
      },
      topUpDetails: {
        start_date: new Date(),
        end_date: getNextMonthDateWithYearCheck(),
        plan_id: currentSubscription?.$id,
        total_properties: currentSubscription?.noOfProperties,
        used_properties: currentSubscription?.usedProperties,
        user_id: userData?.userId,
        topUpId: planDetails?.id,
        //top Up price: topUpDetails?.price
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
const CheckoutPage = ({
  currentSubscription,
  planDetails,
  setErrorOccurred,
  setOnSuccess,
}) => (
  <PayPalScriptProvider
    options={{
      "client-id":
        "AR1CYFbM_D9uUk9mRvFJSsJHTdny-Lddd_tKSVtFUeSK7r-M2dJeEIR6PA5TIkpIr8keinWycBpiikvh",
      // "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
      currency: "USD",
    }}
  >
    <Checkout
      topUpDetails={planDetails}
      setErrorOccurred={setErrorOccurred}
      setOnSuccess={setOnSuccess}
      currentSubscription={currentSubscription}
    />
  </PayPalScriptProvider>
);

export default CheckoutPage;
