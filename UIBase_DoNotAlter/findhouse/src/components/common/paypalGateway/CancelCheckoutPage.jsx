import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getPayPalAccessToken, PayPalApi } from "./utilFunctions";
import { generateResponsePayload } from "../../../utils/Paypal/GeneratePayloads";

const CancelCheckout = ({
  topUpDetails,
  setErrorOccurred,
  setOnSuccess,
  currentSubscription,
  setErrorMessage,
  paymentType,
  userDetailField,
}) => {
  const [currency, setCurrency] = useState("CAD");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")) || {});
  }, []);

  const saveCancellationData = async (payload) => {
    try {
      const response = await axios.post(
        "/api/savePaypalSubscriptionCancellationData",
        payload
      );
      if (response) {
        setOnSuccess(true);
      }
    } catch (err) {
      console.error("got error while saving the cancellation plan:", err);
      setErrorMessage("Got error while saving the cancellation info to DB");
      setErrorOccurred(true);
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

      const request = { subscriptionId };
      const response = { ...cancelSubscriptionResponse };

      const payload = generateResponsePayload(
        paymentType,
        topUpDetails,
        userData,
        request,
        response,
        currentSubscription,
        topUpDetails,
        userDetailField
      );
      saveCancellationData(payload);

      setOnSuccess(true);
    } catch (error) {
      console.error("Failed to cancel subscription:", error);
      toast.error("Failed to cancel subscription:", error);
      // setErrorMessage(
      //   "Your payment has been processed successfully by PayPal. However, we encountered an issue while updating your subscription. Please contact support with your transaction details for assistance."
      // );
      setErrorOccurred(true);
    } finally {
      toast.dismiss();
      window.location.reload();
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
