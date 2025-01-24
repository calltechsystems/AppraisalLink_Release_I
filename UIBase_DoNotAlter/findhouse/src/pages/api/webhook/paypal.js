import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 1. Validate the PayPal webhook signature
    const paypalWebhookId = process.env.PAYPAL_WEBHOOK_ID; // Your webhook ID from PayPal dashboard
    console.log("PAYPAL_WEBHOOK_ID:", process.env.PAYPAL_WEBHOOK_ID);

    const {
      "paypal-transmission-id": transmissionId,
      "paypal-transmission-time": transmissionTime,
      "paypal-cert-url": certUrl,
      "paypal-auth-algo": authAlgo,
      "paypal-transmission-sig": transmissionSig,
    } = req.headers;

    const webhookEvent = req.body;
    const requestBody = JSON.stringify(webhookEvent);

    if (
      !transmissionId ||
      !transmissionTime ||
      !certUrl ||
      !authAlgo ||
      !transmissionSig
    ) {
      return res.status(400).json({ error: "Missing required headers" });
    }

    // Fetch PayPal's public certificate
    const certificateResponse = await fetch(certUrl);
    if (!certificateResponse.ok) {
      return res.status(400).json({ error: "Invalid PayPal certificate URL" });
    }
    const paypalCert = await certificateResponse.text();

    const signatureBase = `${transmissionId}|${transmissionTime}|${paypalWebhookId}|${crypto
      .createHash("sha256")
      .update(requestBody)
      .digest("hex")}`;

    const isValidSignature = crypto
      .createVerify(authAlgo)
      .update(signatureBase)
      .verify(paypalCert, transmissionSig, "base64");

    if (!isValidSignature) {
      return res.status(400).json({ error: "Invalid webhook signature" });
    }

    // 2. Handle the PayPal event
    const eventType = webhookEvent.event_type;

    switch (eventType) {
      case "PAYMENT.SALE.COMPLETED":
        // Handle payment success
        console.log("Payment completed:", webhookEvent);
        break;

      case "CHECKOUT.ORDER.APPROVED":
        // Handle checkout approval
        console.log("Order approved:", webhookEvent);
        break;

      default:
        console.log("Unhandled event type:", eventType);
    }

    // 3. Respond to PayPal
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.error("Error handling PayPal webhook:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
