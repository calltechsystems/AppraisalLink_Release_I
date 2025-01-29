//Paypal Plan ID
const PaypalPlanId = {
    ["lite"]: "P-4F259524XU6273733M6FY5QY",
    ["pro"]: "P-3KE51330455345207M6FY7HI",
    ["ultimate"]: "P-51425321W9368215BM6FZAMY",
  };
  
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
  
  const generateRequestPayload = (paymentType, details, userData, currency) => {
    const { title, id, price } = details;
  
    if (paymentType === "oneTime") {
      // Payload for one-time payment
      return {
        intent: "CAPTURE",
        purchase_units: [
          {
            description: `Broker ${title} Top Up Plan`,
            custom_id: generateCustomId(userData?.userId, id),
            start_time: new Date(convertToCanadaTime(new Date())).toISOString(),
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
      //   custom_id: generateCustomId(userData?.userId, id),
        plan_id: PaypalPlanId[String(title).toLowerCase()],
        // start_time:new Date(convertToCanadaTime(new Date())).toISOString(),
        quantity: "1",
        subscriber: {
          name: {
            given_name: userData?.broker_Details?.firstName,
            surname: userData?.broker_Details?.lastName,
            phone: {
              phone_type: "MOBILE",
              phone_number: userData?.broker_Details?.phoneNumber,
            },
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
    } else if (paymentType === "cancel_subscription") {
      return {
        reason: "",
      };
    } else {
      throw new Error("Invalid type provided. Use 'oneTime' or 'subscription'.");
    }
  };
  
  function convertToCanadaTime(dateInput) {
    const date = new Date(dateInput);
  
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }
  
    // Convert to Canada Eastern Time (UTC -5 or UTC -4 during DST)
    const options = {
      timeZone: "America/Toronto",
      hour12: true,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
  
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }
  
  const generateResponsePayload = (paymentType, details, userData, request, response, currentSubscription, topUpDetails) => {
    const { title, id, price } = details;
  
    if (paymentType === "oneTime") {
      // Payload for one-time payment
      return {
        createTime: new Date(convertToCanadaTime(new Date())).toISOString(),
        updateTime: new Date(convertToCanadaTime(new Date())).toISOString(),
        planId: currentSubscription?.$id,
        planAmount: currentSubscription?.planAmount,
        planName: currentSubscription?.planName,
        userId: userData?.userId,
        paymentId: response?.id,
        topUpId: topUpDetails?.selectedTopUp?.$id,
        paymentRequestSent: JSON.stringify(request),
        paymentResponseReceived: JSON.stringify(response),
        status: "COMPLETED",
        currencyCode: "CAD",
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
            phone: {
              phone_type: "MOBILE",
              phone_number: userData?.broker_Details?.phoneNumber,
            },
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
    } else if (paymentType === "cancel_subscription") {
      return {
        reason: "",
      };
    } else {
      throw new Error("Invalid type provided. Use 'oneTime' or 'subscription'.");
    }
  };
  
  
  module.exports = {
      generateRequestPayload,
      generateResponsePayload
  }