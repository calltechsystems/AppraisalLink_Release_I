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
    baseUrl: "https://api-m.paypal.com",
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
        { reason: "User-requested cancellation" },
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
      cancelSubscription('I-5U83WKLS0SDA');
    } else {
      console.error("No subscription ID found.");
    }
  };
  return (
    <div className="checkout">
      <button onClick={handleCancelSubscription}>Cancel Subscription</button>
    </div>
  );
};

export default CancelCheckout;
