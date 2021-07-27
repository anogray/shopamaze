import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, detailsOrder, payOrder, clearOrderCreated, clearOrderDetails, clearOrderPaid } from '../redux/actions/orderActions';
import RazorpayPayment from '../components/RazorpayPayment';
import { clearCartSuccess } from '../redux/actions/cartActions';
import Toast from '../components/Toast';
import {Modal,Button, Spinner} from "react-bootstrap";
import Loader from '../components/Loader';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import BlockSharpIcon from '@material-ui/icons/BlockSharp';
import CheckBoxOutlineBlankSharpIcon  from '@material-ui/icons/CheckBoxOutlineBlankSharp';

function OrderScreen(props) {

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
  const dispatch = useDispatch();
 
  useEffect(() => {
    if (successPay) {
      dispatch(clearCartSuccess());
      dispatch(clearOrderCreated());
      dispatch(clearOrderDetails());    
      // setTimeout(()=>dispatch(clearOrderPaid()),5000);
      setTimeout(()=>{
        dispatch(clearOrderPaid());
         props.history.push("/orderhistory")},2000);
      
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
    return () => {
    };
  }, [successPay]);

  const handleSuccessPayment = () => {
    console.log("on sucess ran",order);
    dispatch(payOrder(order));
  }

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;

//   const ModalHtml = ()=>(
//     <Modal.Dialog>
//   <Modal.Header>
//     <Modal.Title>Payment Succesfully Paid !</Modal.Title>
//   </Modal.Header>

//   <Modal.Body>
//     <p>Redirecting to  Orders Screen</p>
//   <Spinner animation="border" variant="primary" />
    
//   </Modal.Body>

// </Modal.Dialog>
// )



  return successPay  ? <Toast/>
    : loading ? <div className="loading-position"><Loader/></div> : error ? <div>{error}</div> :

    <div>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>
              Shipping
          </h3>
            <div>
              {order.shipping.address}, {order.shipping.city},
          {order.shipping.postalCode}, {order.shipping.country},
          </div>
            <div className="paid-icon">
              Delivered : {order.isDelivered ? "Delivered at " + order.deliveredAt : <CheckBoxOutlineBlankSharpIcon/>}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>
              Payment Method: {order.payment.paymentMethod}
            </div>
            <div className="paid-icon">
              Paid {order.isPaid ? <CheckBoxIcon/> : <CheckBoxOutlineBlankSharpIcon/>}
            </div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>
                  Order Items
          </h3>
              </li>
              {
                order.orderItems.length === 0 ?
                  <div>
                    Cart is empty
          </div>
                  :
                  order.orderItems.map(item =>
                    <li key={item._id}>
                      <div className="cart-item">
                        <img src={item.image} className="cart-image" alt="product" />
                        <div className="cart-item-details">
                      <div className="cart-name">
                        <div>
                          <Link to={"/product/" + item.product}>
                            {item.name}
                          </Link>

                        </div>
                        <div>
                          Qty: {item.qty}
                        </div>
                      </div>
                      <div className="cart-price">
                       Price : ${item.price}
                      </div>
                      </div>
                      </div>
                      
                    </li>
                  )
              }
            </ul>
          </div>


        </div>
        <div className="placeorder-action">
          <ul>
            <li className="placeorder-actions-payment">
              {loadingPay && <div>Finishing Payment...</div>}
              {!order.isPaid &&
                <RazorpayPayment
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment} />
              }
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>INR {order.itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>INR {order.shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>INR {order.taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>INR {order.totalPrice}</div>
            </li>
          </ul>



        </div>

      </div>
    </div>

}

export default OrderScreen;