import React, { useEffect, useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import { generateRequestPayload } from "../../../utils/Paypal/GeneratePayloads.js";

import toast from "react-hot-toast";

const ReviseCheckout = ({
  planDetails,
  setErrorOccurred,
  setOnSuccess,
  currentSubscription,
  setErrorMessage,
  paymentType,
  userDetailField
}) => {
  const [currency, setCurrency] = useState("CAD");
  const [userData, setUserData] = useState({});

  // const environment = new paypal.core.SandboxEnvironment(
  //   process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  //   process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET
  // );

  // Function to revise the subscription
  // const reviseSubscription = async (subscriptionId, payload) => {
  //   toast.loading("Upgrading the Plan");
  //   const request = new paypal.subscriptions.SubscriptionReviseRequest(
  //     subscriptionId
  //   );
  //   console.log({payload})
  //   request.requestBody(payload);

  //   // Make the request to revise the subscription
  //   try {
  //     const response = await paypalClient.client().execute(request);
  //     console.log("Subscription updated successfully:", response.result);
  //     setOnSuccess(true);
  //   } catch (error) {
  //     console.error("Error updating subscription:", error);
  //     setErrorMessage("Failed to upgrade your subscirption .Please try again ");
  //     setErrorOccurred(true);
  //   } finally {
  //     toast.dismiss();
  //   }
  // };

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

  // // Function to get PayPal access token
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

  // // Function to revise subscription
  const revisePayPalSubscription = async (subscriptionId, payload) => {
    try {
      toast.loading("Upgrading the Plan");
      const accessToken = await getPayPalAccessToken();
      console.log(payload);

      const reviseSubscriptionResponse = await axios.patch(
        `${PayPalApi.baseUrl}/v1/billing/subscriptions/${subscriptionId}/revise`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log({ reviseSubscriptionResponse });
      setOnSuccess(true);
    } catch (error) {
      console.error("Failed to upgrade subscription:", error);
      setErrorMessage("Failed to upgrade your subscirption .Please try again ");
      setErrorOccurred(true);
    } finally {
      toast.dismiss();
    }
  };

  const handleUpgradeSubscription = () => {
    if (currentSubscription) {
      const payload = generateRequestPayload(
        paymentType,
        planDetails,
        userData,
        "CAD",
        userDetailField
      );

      //STATIC ONE SUBSCRIPTION ID
      const currentSubscriptionId = "I-SA10TRTMHX7G";
      revisePayPalSubscription(currentSubscriptionId, payload);
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
        onClick={handleUpgradeSubscription}
      >
        Upgrade Subscription
      </button>
    </div>
  );
};

export default ReviseCheckout;
