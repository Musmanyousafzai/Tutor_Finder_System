import React, { useEffect, useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51PrE8kJiROh6zHTCDaXrd5idjYQhyRoWTuOJh0UWkD3MVaT1kZghbwqj8YLA84CsyaDaxGkSDBOoIDnxrnPOZaWl00QI1A7Hw4"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("loading"); // 'loading', 'success', 'error'
  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
        setPaymentStatus("pending");
      } catch (err) {
        console.error("Error fetching client secret:", err);
        setPaymentStatus("error");
      }
    };
    makeRequest();
  }, [id]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  const renderContent = () => {
    if (paymentStatus === "loading") {
      return <div className="loading-message">Loading payment details...</div>;
    } else if (paymentStatus === "error") {
      return (
        <div className="error-message">
          Something went wrong! Please try again later.
        </div>
      );
    } else if (paymentStatus === "pending" && clientSecret) {
      return (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm setPaymentStatus={setPaymentStatus} />
        </Elements>
      );
    } else if (paymentStatus === "success") {
      return (
        <div className="success-message">
          Payment successful! Thank you for your purchase.
        </div>
      );
    }
  };

  return (
    <div className="pay">
      <div className="pay-container">
        <div className="header">Complete Your Payment</div>
        <div className="order-summary">
          <div className="order-title">Order Summary</div>
          <div className="order-details">
            {/* Display order details (e.g., amount, product name) */}
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Pay;
