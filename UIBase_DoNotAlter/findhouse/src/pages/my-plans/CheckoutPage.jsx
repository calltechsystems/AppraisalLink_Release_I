import React, { useEffect, useState } from "react";
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import toast from "react-hot-toast";

const Checkout = ({
  topUpDetails,
  setErrorOccurred,
  setOnSuccess,
  currentSubscription,
  paymentType,
}) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency || "CAD");
  const [userData, setUserData] = useState({});

  //Paypal Plan ID
  const PaypalPlanId = {
    ["lite"]: "P-4F259524XU6273733M6FY5QY",
    ["pro"]: "P-3KE51330455345207M6FY7HI",
    ["ultimate"]: "P-51425321W9368215BM6FZAMY",
  };

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")) || {});
  }, [topUpDetails]);

  console.log({ userData });

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

  const generatePayload = (details, userData, currency) => {
    const { title, id, price } = details;

    if (paymentType === "oneTime") {
      // Payload for one-time payment
      return {
        intent: "CAPTURE",
        purchase_units: [
          {
            description: `Broker ${title} Top Up Plan`,
            custom_id: generateCustomId(userData?.userId, id),
            amount: {
              value: price,
              currency_code: currency,
              breakdown: {
                item_total: {
                  value: price,
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
                name: `Top Up ${title} Plan`,
                quantity: "1",
                unit_amount: {
                  value: price,
                  currency_code: currency,
                },
                description:
                  "Monthly subscription top up add for listing properties",
                category: "DIGITAL_GOODS",
              },
            ],
          },
        ],
        application_context: {
          brand_name: "Appraisal Land",
          locale: "en-US",
          user_action: "PAY_NOW",
          shipping_preference: "NO_SHIPPING",
        },
      };
    } else if (paymentType === "subscription") {
      // Payload for subscription payment
      return {
        // custom_id: generateCustomId(userData?.userId, id),
        plan_id: PaypalPlanId[String(title).toLowerCase()],
        // start_time: new Date(),
        quantity: "1",
        subscriber: {
          name: {
            given_name: userData?.broker_Details?.firstName,
            surname: userData?.broker_Details?.lastName,
            phone:{
              phone_type: 'MOBILE',
              phone_number: userData?.broker_Details?.phoneNumber
            }
          },
          email_address: userData?.broker_Details?.emailId,
          shipping_address: {
            name: {
              full_name:
                userData?.broker_Details?.firstName +
                " " +
                userData?.broker_Details?.lastName,
            },
            address: {
              address_line_1:
                userData?.broker_Details?.apartmentNo +
                "," +
                userData?.broker_Details?.streetNumber +
                " " +
                userData?.broker_Details?.streetName +
                " " +
                userData?.broker_Details?.area,
              address_line_2:
                userData?.broker_Details?.apartmentNo +
                "," +
                userData?.broker_Details?.streetNumber +
                " " +
                userData?.broker_Details?.streetName +
                " " +
                userData?.broker_Details?.area,
              admin_area_2: userData?.broker_Details?.province,
              admin_area_1: userData?.broker_Details?.city,
              postal_code: userData?.broker_Details?.postalCode,
              country_code: "US",
            },
          },
        },
        application_context: {
          brand_name: "Appraisal Land",
          locale: "en-US",
          shipping_preference: "NO_SHIPPING",
          user_action: "SUBSCRIBE_NOW",
          payment_method: {
            payer_selected: "PAYPAL",
            payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
          },
          return_url: "https://appraisal-eta.vercel.app/my-plans",
          cancel_url: "https://appraisal-eta.vercel.app/my-plans",
        },
        // plan:{
        //   taxes: {
        //     inclusive: false,
        //     percentage: '13.16'
        //   }
        // }
      };
    } else {
      throw new Error(
        "Invalid type provided. Use 'oneTime' or 'subscription'."
      );
    }
  };

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
    const payload = generatePayload(topUpDetails, userData, currency);
    console.log({ paymentType, payload: JSON.stringify(payload) });
    return actions.order.create(payload);
  };

  const createSubscription = (data, actions) => {
    const payload = generatePayload(topUpDetails, userData, currency);
    console.log({ paymentType, payload });
    return actions.subscription.create(payload);
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
        topUpId: topUpDetails?.id,
        //top Up price: topUpDetails?.price
      },
    };
  };

  const onApproveOrder = (data, actions) => {
    if (paymentType == "oneTime") {
      return actions.order.capture().then((details) => {
        const payload = generateTheTransactionPayload(details);
        setOnSuccess(true);
        console.log({ approveDetails: details });
        //save this payload to the DB
      });
    } else {
      console.log({data, actions: actions.subscription.get()})
      console.log("Subscription ID:", data.subscriptionID);
      setOnSuccess(true);
    }
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
            style={{
              layout: "vertical",
              color: "blue",
              shape: "pill",
              label: paymentType === "oneTime" ? "pay" : "subscribe",
            }}
            {...(paymentType === "oneTime"
              ? { createOrder: onCreateOrder }
              : { createSubscription: createSubscription })}
            onApprove={onApproveOrder}
            onCancel={onCancelOrder}
            onError={onError}
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
  paymentType,
}) => (
  <PayPalScriptProvider
    options={{
      "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
      currency: "CAD",
      intent: paymentType === "subscription" ? "subscription" : "capture",
      vault: paymentType === "subscription" ? true : false,
    }}
  >
    <Checkout
      topUpDetails={planDetails}
      setErrorOccurred={setErrorOccurred}
      setOnSuccess={setOnSuccess}
      currentSubscription={currentSubscription}
      paymentType={paymentType}
    />
  </PayPalScriptProvider>
);

export default CheckoutPage;
