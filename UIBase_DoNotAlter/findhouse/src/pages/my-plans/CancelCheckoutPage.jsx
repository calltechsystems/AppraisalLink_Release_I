import React, { useEffect, useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import toast from "react-hot-toast";

const CancelCheckout = ({
  topUpDetails,
  setErrorOccurred,
  setOnSuccess,
  currentSubscription,
  setErrorMessage,
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
      toast.loading("Cancelling the Plan");
      const accessToken = await getPayPalAccessToken();

      const cancelSubscriptionResponse = await axios.post(
        `${PayPalApi.baseUrl}/v1/billing/subscriptions/${subscriptionId}/cancel`,
        { reason: "Customer requested cancellation" },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log({cancelSubscriptionResponse})
      setOnSuccess(true);
    } catch (error) {
      console.error("Failed to cancel subscription:", error);
      setErrorMessage(
        "Your payment has been processed successfully by PayPal. However, we encountered an issue while updating your subscription. Please contact support with your transaction details for assistance."
      );
      setErrorOccurred(true);
    }
    finally{
      toast.dismiss();
    }
  };

  const handleCancelSubscription = () => {
    if (currentSubscription) {
      // cancelSubscription(currentSubscription?.cancelSubscription)
      cancelSubscription("I-4X2VPH98M849");
    } else {
      console.error("No subscription ID found.");
      setErrorMessage("No subscription ID found. Please try again");
      setErrorOccurred(true);
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
