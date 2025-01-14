import React, { useRef, useEffect } from "react";

export default function Paypal() {
  const paypal = useRef();

  useEffect(() => {
    const loadPayPalScript = () => {
      const script = document.createElement("script");
      script.src = "https://www.paypal.com/sdk/js?client-id=AWiI79b9Fzj8xuGQZ2ZuiZZsDlX18Ykyn63VhWevE2_E5eKKXo05IUqVRDJ3qLcvjLRQGen3N19B-kJ8";
      script.async = true;
      script.onload = () => {
        if (window.paypal) {
          window.paypal
            .Buttons({
              createOrder: (data, actions, err) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      description: "Cool looking table",
                      amount: {
                        currency_code: "USD",
                        value: 650.0,
                      },
                    },
                  ],
                });
              },
              onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                console.log(order);
              },
              onError: (err) => {
                console.log(err);
              },
            })
            .render(paypal.current);
        } else {
          console.error("PayPal SDK not loaded.");
        }
      };
      document.body.appendChild(script);
    };

    loadPayPalScript();
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
