import React from 'react'
import order from "./img/order-succes.jpg";
const PaymentSuccess = () => {
  return (
    <div className="order">
            <div className="order_background">
              <div className="order-container">
                <img src={order} alt="" />

                <br />

                <h4>Order Successfully placed !!</h4>
                <br />

                {/* <span>Go to home fororder</span> */}
              </div>
            </div>
          </div>
  )
}

export default PaymentSuccess
