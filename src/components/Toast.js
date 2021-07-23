import React from 'react';
//  import 'bootstrap/dist/css/bootstrap.min.css';

import {Modal,Button, Spinner} from "react-bootstrap";
import Loader from './Loader';

const ModalHtml = ()=>(
    <Modal.Dialog>
  <Modal.Header>
    <Modal.Title>Payment Succesfully Paid !</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <p>Redirecting to  Orders Screen</p>
  <Spinner animation="border" variant="primary" />
    
  </Modal.Body>

</Modal.Dialog>
)

const HtmlModal = ()=>(
    <div className="modal-success">
            <div className="payment-modal">
            Payment Succesfully Paid !  
            </div>
            <div className="payment-redirect">
            <p>Redirecting to  Orders Screen</p>
            </div>
            <Loader/>

    </div>
)

const Toast = () => {
    console.log("gotToasted");
    return (
        <HtmlModal/>
    );
}

export default Toast;
