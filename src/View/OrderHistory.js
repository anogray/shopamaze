import { Button } from 'react-bootstrap';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Loader from '../components/Loader';
import { listMyOrders } from '../redux/actions/orderActions';
import axios from "axios";


const OrderHistory = (props) => {

const myOrderList = useSelector(state => state.myOrderList);
const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
const dispatch = useDispatch();

useEffect(() => {
    dispatch(listMyOrders());
    return () => {

    };
  }, [])

  const downloadInvoice = (orderId)=>{
      console.log({orderId});
         axios.post("/api/download/",{orderId}).then((resp)=>
        {
        
        axios.get(`${resp.data.fileUrl}`,{responseType: 'blob'}).then(({ data }) => {
            console.log("download blob",data)
        const downloadUrl = window.URL.createObjectURL(new Blob([data]));

        const link = document.createElement('a');

        link.href = downloadUrl;
        console.log("url",downloadUrl);

        link.setAttribute('download', 'Invoice.pdf'); //any other extension

        document.body.appendChild(link);

        link.click();

        link.remove();

      });



    });
  }

console.log("orderhistory",orders);
    return (
        <div classname="ordered-container">
        { loadingOrders ? <Loader/> :
          errorOrders ? <div>{errorOrders} </div> :
            orders.map((order)=>(<div key={order._id} className="ordered-body">
            
            <div className="ordered-header">
                <div className="left">
                    <div>
                        <div className="order-placed">
                        Order Placed
                        </div>
                        <div className="order-price">
                        {order.totalPrice}
                        </div>
                    </div>
                    <div className="order-total">
                        <div >
                        Order Total
                        </div>
                        <div >
                        {order.totalPrice}
                        </div>
                    </div>
                </div>

                <div className="order-extras">
                    <Link to={"/order/" + order._id}>Order Details</Link>
                    <div className="order-invoice">
                        <Button onClick={()=>downloadInvoice(order._id)}>Invoice</Button>
                    </div>                </div>
            </div>
            {order.orderItems.map((item)=>(<div className="head-details">
                {/* <div className="ordered-image"> */}
                    <img className="ordered-img" src="d1.jpg" alt="product" />
                {/* </div> */}
                <div className="ordered-title">
                    {item.name}
                </div>
            </div>)) }
        </div>))}
            
        </div>
    );
}

export default OrderHistory;
