// import { Button } from 'react-bootstrap';
import { Button, TextField } from '@material-ui/core';

import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Loader from '../components/Loader';
import { listMyOrders } from '../redux/actions/orderActions';
// import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from "axios";
import { useState } from 'react';
const backendUrl = "https://shopamaze.herokuapp.com";

const __DEV__ = document.domain === 'localhost'
const backDomain = __DEV__ ? "" : backendUrl;

const OrderHistory = (props) => {

const myOrderList = useSelector(state => state.myOrderList);
const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
const dispatch = useDispatch();

const [open, setOpen] = useState(false);
const [gotresp,setGotResp] = useState(false);
const [orderId,getOrder] = useState("");

useEffect(() => {
    dispatch(listMyOrders());
    return () => {

    };
  }, [])




  const handleClickOpen = (id) => {
    getOrder(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const downloadInvoice = (orderId,toInvoice)=>{
                setGotResp(true);
      console.log({orderId},{toInvoice});
         axios.post(backDomain+"/api/download/",{orderId,toInvoice}).then((resp)=>
        {
            console.log("email resp",resp);

        if(toInvoice=="download"){    
        console.log("fileurl",resp);

        if(resp.data.fileUrl==false){
            throw new Error("File doesn't exist !");
        }
        axios.get(`${backDomain}${resp.data.fileUrl}`,{responseType: 'blob'}).then(({ data }) => {
            console.log("download blob",data)
        const downloadUrl = window.URL.createObjectURL(new Blob([data]));

        const link = document.createElement('a');

        link.href = downloadUrl;

        link.setAttribute('download', "invoice.pdf"); //any other extension

        console.log("url",downloadUrl,link);

        document.body.appendChild(link);

        link.click();

        link.remove();
        setGotResp(false);

      })
    }
      /*
      .then()
      */
    
      if(resp.data.email==true){
        setGotResp(false);
      }

     handleClose();

    }).catch(err => console.log("err",err))
  }
//let datestr = order.createdAt.toDateString().split(" ")${datestr[1]} ${datestr[2]}, ${datestr[3]}
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
                        {new Date(order.createdAt).toISOString().slice(0, 10)}
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
                    <Link to={"/order/" + order._id}><Button  color ="primary">Order Details</Button></Link>
                    <div className="order-invoice">
                    {/* <Button  color ="primary" onClick={()=>downloadInvoice(order._id)}>Invoice</Button> */}
                    {/* <Button  color ="primary" onClick={()=>downloadInvoice(order._id)}>Invoice</Button> */}
                    {order.invoice && <Button variant="outlined" color="primary" onClick={()=>handleClickOpen(order._id)}>
                        Invoice
                    </Button>}
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
        {/* <DialogTitle id="alert-dialog-title">{""}</DialogTitle> */}
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {gotresp && <div className="ui-loading"><CircularProgress /></div>}
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={()=>downloadInvoice(orderId,"download")} color="primary">
                            Download
                        </Button>
                        <Button onClick={()=>downloadInvoice(orderId,"mail")} color="primary" >
                            Email
                        </Button>
                        </DialogActions>
                    </Dialog>
  
 
                    </div>
                </div>                
            </div>
            {order.orderItems.map((item)=>(<div className="head-details">
                {/* <div className="ordered-image"> */}
                    <img className="ordered-img" src={item.image} alt="product" />
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
