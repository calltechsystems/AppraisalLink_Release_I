import React, { useEffect, useState } from "react";
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import toast from "react-hot-toast";

import {
  generateRequestPayload,
  generateResponsePayload,
} from "../../utils/Paypal/GeneratePayloads";

import axios from "axios";
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

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")) || {});
  }, [topUpDetails]);

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
    const payload = generateRequestPayload(
      paymentType,
      topUpDetails,
      userData,
      currency
    );
    return actions.order.create(payload);
  };

  const createSubscription = (data, actions) => {
    const payload = generateRequestPayload(
      paymentType,
      topUpDetails,
      userData,
      currency
    );
    console.log({ paymentType, payload });
    return actions.subscription.create(payload);
  };

  const saveOneTimePaymentData = (payload) => {
    toast.loading("Saving the data to DB for Top Up");
    console.log({ payload });
    // const encryptedData = encryptionData(payload);
    axios
      .post("/api/saveOneTimePaymentData", payload, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        toast.success("Added TopUp successfully.");
        console.log(res);
        setOnSuccess(true);
      })
      .catch((err) => {
        console.error("Got error while adding TpUp", err);
        toast.error("Got error while adding the TopUp");
        setErrorOccurred(true);
      });
    toast.dismiss();
  };

  const onApproveOrder = (data, actions) => {
    if (paymentType == "oneTime") {
      return actions.order.capture().then((details) => {
        const request = generateRequestPayload(
          paymentType,
          topUpDetails,
          userData,
          currency
        );
        const finalOneTimeData = generateResponsePayload(
          paymentType,
          topUpDetails,
          userData,
          request,
          details,
          currentSubscription,
          topUpDetails
        );
        saveOneTimePaymentData(finalOneTimeData);
      });
    } else {
      console.log({ data, actions: actions.subscription.get() });
      console.log("Subscription ID:", data.subscriptionID);
      setOnSuccess(true);
    }
  };

  //------------------CANCEL WHILE TRANSACTION----------------------
  const onCancelOrder = (data) => {
    console.error("PayPal On Cancel data:", data);

    if (data && data.reason) {
      switch (data.reason) {
        case "USER_CANCELED":
          console.log("The user canceled the payment.");
          toast.error("You have canceled the payment.");
          break;
        case "TIMEOUT":
          console.log("Payment process timed out.");
          toast.error("Payment process timed out. Please try again.");
          break;
        case "INCOMPLETE_PAYMENT":
          console.log("Payment was incomplete.");
          toast.error("Payment was incomplete. Please complete the payment.");
          break;
        case "PAYMENT_CANCELLED":
          console.log("Payment was canceled by PayPal.");
          toast.error("Payment was canceled unexpectedly.");
          break;
        default:
          console.log("Unknown cancellation reason:", data.reason);
          toast.error("Payment was canceled for an unknown reason.");
          break;
      }
    } else {
      console.log("Payment was canceled without a specified reason.");
      toast.error("Payment was canceled.");
    }

    setErrorOccurred(true);
  };

  //------------------ERROR WHILE TRANSACTION----------------------
  const onError = (err) => {
    console.error("PayPal On Error data:", err);

    if (err && err.message) {
      switch (err.message) {
        case "PAYMENT_DECLINED":
          console.log("The payment was declined.");
          toast.error(
            "Your payment was declined. Please check your payment details."
          );
          break;
        case "PAYMENT_NETWORK_ERROR":
          console.log("Network error occurred.");
          toast.error(
            "A network error occurred. Please check your connection and try again."
          );
          break;
        case "INCOMPLETE_PAYMENT":
          console.log("Payment was incomplete.");
          toast.error("Payment was incomplete. Please try again.");
          break;
        case "PAYPAL_ACCOUNT_BLOCKED":
          console.log("The PayPal account is blocked.");
          toast.error(
            "Your PayPal account is blocked. Please contact PayPal support."
          );
          break;
        case "CARD_DECLINED":
          console.log("The credit card was declined.");
          toast.error(
            "Your credit card was declined. Please try a different payment method."
          );
          break;
        case "EXPIRED_SESSION":
          console.log("The payment session has expired.");
          toast.error(
            "Your session has expired. Please start the payment process again."
          );
          break;
        case "UNAUTHORIZED":
          console.log("Unauthorized access to PayPal.");
          toast.error("You are not authorized to complete this payment.");
          break;
        default:
          console.error("Unknown error occurred:", err);
          toast.error("An unexpected error occurred. Please try again.");
          break;
      }
    } else if (err.code) {
      switch (err.code) {
        case "BAD_REQUEST":
          toast.error("The request to PayPal was malformed.");
          break;
        case "INTERNAL_SERVER_ERROR":
          toast.error(
            "An internal server error occurred. Please contact support."
          );
          break;
        case "NETWORK_ERROR":
          toast.error(
            "A network error occurred. Please check your connection."
          );
          break;
        default:
          toast.error("An error occurred: " + err.code);
          break;
      }
    } else {
      toast.error("An unknown error occurred. Please try again.");
    }

    setErrorOccurred(true);
  };

  return (
    <div className="checkout">
      {isPending ? (
        <p>LOADING...</p>
      ) : (
        <>
          <div className="text-center mt-2 mb-2">
            <label htmlFor="currency-selector">Select Currency :</label>
            <select
              id="currency-selector"
              value={currency}
              onChange={onCurrencyChange}
            >
              <option value="CAD">🇨🇦 CAD (Canadian Dollar)</option>
            </select>
          </div>

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
