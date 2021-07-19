import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const __DEV__ = document.domain === 'localhost'


function RazorpayPayment(props) {
  const [sdkReady, setSdkReady] = useState(false);
  const {order} = useSelector(state=>state.orderDetails);
  
  console.log("paymentprops",props);
  const addRazorPay = (src) =>{
      
    return new Promise((resolve,reject)=>{

        const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			reject(false)
		}
		document.body.appendChild(script)
      })
  }

  const displayRazorpay = async()=>{

    try{
        const res = await addRazorPay("https://checkout.razorpay.com/v1/checkout.js");
    
        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?')
            return
        }
    
        const {data} = await axios.post('/api/razorpay',order);
    
            console.log("paymentData from server",data)
    
            const options = {
                key: __DEV__ ? data.client_Id : 'PRODUCTION_KEY',
                currency: data.currency,
                amount: data.amount+"",
                order_id: data.id,
                name: 'Testing order',
                description: 'Thank you for nothing. Please give us some exp',
                // callback_url: 'http://localhost:3004/api/razorpay/verification',
                image: '',
                handler: function (response) {
                  console.log("props handler",props);
                  props.onSuccess();
                    // alert(response.razorpay_payment_id)
                    // alert(response.razorpay_order_id)
                    // alert(response.razorpay_signature)
                },
                prefill: {
                    name:"MrTest",
                    email: 'sdfdsjfh2@ndsfdf.com',
                    phone_number: '9999999999'
                }
            }
            console.log("scripts",window);
            const paymentObject = new window.Razorpay(options)
            paymentObject.open();
    }catch(err){
        console.log({err});
    }

  }
  

  const addPaypalSdk = async () => {
    const result = await axios.get("/api/config/paypal");
    const clientID = result.data;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.paypal.com/sdk/js?client-id=' + clientID;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    }
    document.body.appendChild(script);
  }

  const createOrder = (data, actions) => actions.order.create({
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: props.amount
        }
      }
    ]
  });

  const onApprove = (data, actions) => actions.order
    .capture()
    .then(details => props.onSuccess(data, details))
    .catch(err => console.log(err));

//   useEffect(() => {
//     if (!window.paypal) {
//       addPaypalSdk();
//     }
//     return () => {
//       //
//     };
//   }, []);

//   if (!sdkReady) {
//     return <div>Loading...</div>
//   }

//   const Button = window.paypal.Buttons.driver('react', { React, ReactDOM });

  return (
    <button className="button primary full-width" onClick={displayRazorpay}>
        Pay Now 
    </button>
  )

//   return <Button {...props} createOrder={(data, actions) => createOrder(data, actions)}
//     onApprove={(data, actions) => onApprove(data, actions)} />
}

export default RazorpayPayment;