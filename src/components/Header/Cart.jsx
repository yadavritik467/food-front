import React, { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import "../Header/NavbarCo.css";
import { CartState } from "../../context/Context";
import axios from "axios";
import  toast  from "react-hot-toast";

function Cart() {
 
  const navigate = useNavigate();

  const {
    state: { Cart },
    dispatch,
  } = CartState();

  const [amount, setAmount] = useState(0);
  const changeQty = (_id, qty) => {
    dispatch({
      type: "CHANGE_QTY",
      payload: {
        _id,
        qty,
      },
    });
  };

  useEffect(() => {
    setAmount(
      Cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [Cart]);

  // payment is working succesfully

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_cfpXwdEBSA6tMg",
      amount: data.amount,
      currency: "INR",
      name: data.name,
      order_id: data._id,
      callback_url: "/payment/paymentVarification",
      handler: function (response) {
        dispatch({
          type: "CLEAR_ALL",
        });
        navigate("/user/paymentSuccess");
        console.log(response);
      },

      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#FFC300",
      },
    };
    var rzp1 = new window.Razorpay(options);

    rzp1.open();
  };

  const orderHandler = async (amount) => {
    // const {data:{key}} = await axios.get("/payment/getKey");
    const { data } = await axios.post("/payment/payment", { amount: amount });
    console.log(data);
    initPayment(data.data);
  };

  return (
    <>
      <div className="checkout-modal">
        <h2>Checkout Modal</h2> <br />
        {/* <Link style={{marginLeft:"auto",textDecoration:"auto"}} to={"/user/myOrder"}>My order</Link> */}
        <div className="cart_container">
          {Cart.length > 0 ? (
            Cart.map((data) => {
              return (
                <div key={data._id} className="checkout-modal_list">
                  <div className="checkout-modal_list-item">
                    <div>
                      <img
                        className="img-cart"
                        alt={data.title}
                        src={data.image}
                      />
                    </div>

                    <div className="information">
                      <h4>
                        {data.title} <br /> Rs. {data.price}
                      </h4>
                    </div>

                    <div className=" cart-addon cart-addon__modal">
                      <button onClick={() => changeQty(data._id, data.qty - 1)}>
                        -
                      </button>
                      <span className="counter">{data.qty}</span>
                      <button onClick={() => changeQty(data._id, data.qty + 1)}>
                        +
                      </button>
                      <button
                        style={{ fontSize: "18.1px" }}
                        className="cart-add"
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_CART",
                            payload: {
                              _id: data._id,
                            },
                          })
                          & toast.success("Remove from cart")
                        }
                      >
                        <RiDeleteBin5Line />{" "}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-cart">please add something in your cart</div>
          )}
        </div>
        <hr />
        <div className="total_amount">
          <div>
            <h4>Total Items: {Cart.length} </h4>
            <h4>Total Amount: {amount} INR </h4>
          </div>

          {Cart.length > 0 && (
            <div>
              <button
                onClick={() =>
                  dispatch({
                    type: "CLEAR_ALL",
                  })
                  & toast.success("All cleared from cart")
                }
              >
                Clear all{" "}
              </button>

              <button onClick={() => orderHandler(amount)}>Order Now</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
