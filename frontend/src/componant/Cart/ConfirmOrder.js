import React from 'react'
import "./ConfirmOrder.css"
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import { Link } from "react-router-dom";
import {Typography} from '@material-ui/core'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

const ConfirmOrder = () => {

    const navigate=useNavigate()
    const { shippingInfo, cartItems } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.user)
   
   
    const subtotal= cartItems.reduce(
        (acc,item)=>acc+item.quantity* item.price,
        0
    )
   const shippingCharge=subtotal>1000? 0 : 60

   const tax = subtotal * 0.18;

   const totalPrice= subtotal+ shippingCharge + tax

   const address= `${shippingInfo.address},${shippingInfo.city} , ${shippingInfo.state},${shippingInfo.pinCode},${shippingInfo.country}`
   
   const proceedToPayment=()=>{
    const data={
        subtotal,
        shippingCharge,
        tax,
        totalPrice
    }
    sessionStorage.setItem("orderInfo",JSON.stringify(data))
    navigate("/process/payment")
   }
    return (
        <Fragment>
            <MetaData title="Confirm Order" />
            <CheckoutSteps activeStep={1} />
            <div className="confirmOrderPage">
                <div>
                    <div className="confirmshippingArea">
                        <Typography>Shipping Info</Typography>
                        <div className="confirmshippingAreaBox">
                            <div>
                                <p>Name:</p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInfo.name}</span>
                            </div>
                            <div>
                                <p>address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                        <div className="confirmCartItems">
                            <Typography>Your cart Items</Typography>
                            <div className="confirmCartItemsContainer">
                                {cartItems && cartItems.map((item) => (
                                    <div key={item.product}>
                                        <img src={item.image} alt="product" />
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                                        <span>
                                            {item.quantity} X ₹{item.price}={' '}
                                            <b>₹{item.price * item.quantity}</b>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* */}
                <div>
                    <div className="orderSummary">
                        <Typography>
                            Order Summery
                        </Typography>
                        <div>
                            <div>
                                <p>Subtotal:</p>
                                <span>₹{subtotal}</span>
                            </div>
                            <div>
                                <p>Shipping Charges:</p>
                                <span>
                                    ₹{shippingCharge}
                                </span>
                            </div>
                            <div>
                                <p>GST:</p>
                                <span>₹{tax}</span>
                            </div>
                        </div>
                        <div className="orderSummeryTotal">
                            <p>
                                <b>Total:</b>
                            </p>
                                <span>₹{totalPrice}</span>
                        </div>
                        <button onClick={proceedToPayment}>Proceed to payment</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ConfirmOrder



