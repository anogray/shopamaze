import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { savePayment } from '../redux/actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function PaymentScreen(props) {


  const razorScript = ()=>{
    let sr = document.createElement("script");
    sr.src="https://checkout.razorpay.com/v1/checkout.js"
    document.body.appendChild(sr);
    console.log({sr});
  }
    const [paymentMethod, setPaymentMethod] = useState('');
  
    const dispatch = useDispatch();
  
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(savePayment({ paymentMethod }));
      props.history.push('placeorder');
    };
    return (
      <div>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Payment</h2>
              </li>
  
              <li>
                <div>
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="paymentMethod"
                    value="razorpay"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></input>
                  <label for="paymentMethod">Razorpay</label>
                </div>
              </li>
  
              <li>
                <button type="submit" className="button app-primary" onClick={razorScript}>
                  Continue
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
  export default PaymentScreen;