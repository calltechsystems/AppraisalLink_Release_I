import React, { useEffect, useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";

const CancelCheckout = ({
  topUpDetails,
  setErrorOccurred,
  setOnSuccess,
  currentSubscription,
  paymentType,
}) => {
  const [currency, setCurrency] = useState("CAD");
  const [userData, setUserData] = useState({});

  const PayPalApi = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET,
    baseUrl:
      // process.env.NODE_ENV === "production"
      //   ? "https://api-m.paypal.com"
      //   :
      "https://api-m.sandbox.paypal.com", // Use sandbox in development
  };

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")) || {});
  }, []);

  // Function to get PayPal access token
  const getPayPalAccessToken = async () => {
    const credentials = `${PayPalApi.clientId}:${PayPalApi.clientSecret}`;
    const encodedCredentials = btoa(credentials); // Base64 encode the credentials

    try {
      const response = await axios.post(
        `${PayPalApi.baseUrl}/v1/oauth2/token`,
        new URLSearchParams({ grant_type: "client_credentials" }),
        {
          headers: {
            Authorization: `Basic ${encodedCredentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      return response.data.access_token;
    } catch (error) {
      console.error("Failed to fetch PayPal access token:", error);
      throw new Error("Unable to fetch PayPal access token.");
    }
  };

  // Function to cancel subscription
  const cancelSubscription = async (subscriptionId) => {
    try {
      const accessToken = await getPayPalAccessToken();

      await axios.post(
        `${PayPalApi.baseUrl}/v1/billing/subscriptions/${subscriptionId}/cancel`,
        { reason: "Customer requested cancellation" },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Subscription canceled successfully.");
      setOnSuccess(true);
    } catch (error) {
      console.error("Failed to cancel subscription:", error);
      setErrorOccurred(true);
    }
  };

  const handleCancelSubscription = () => {
    if (currentSubscription) {
      cancelSubscription("I-VDJS9UL9CHBS");
    } else {
      console.error("No subscription ID found.");
    }
  };
  return (
    <div className="checkout text-center">
      <span style={{ fontSize: "17px" }}>
        Please click checkout to proceed with the Order
      </span>
      <br />
      <button
        className="btn btn-color w-50 mt-2"
        // style={{ marginLeft: "20px" }}
        onClick={handleCancelSubscription}
      >
        Cancel Subscription
      </button>
    </div>
  );
};

export default CancelCheckout;
