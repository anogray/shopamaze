import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";

const CartScreen = (props) => {
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;
  console.log("cartitems",cartItems, cart);

  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      console.log(productId, "here");
      dispatch(addToCart(productId, qty));
    }
  }, []);

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const checkoutHandler = ()=>{
    props.history.push("/signin?redirect=shipping");
  }

  return (
    <div className="cart-container">
      <div className="cart-list">
        <ul className="cart-list-container">
          <h3>Shopping Cart</h3>
          <h4>Price</h4>
          {cartItems.length == 0 ? (
            <div>Cart is Empty</div>
          ) : (
            cartItems.map((item) => (
              <li key={item.product}>
                <div className="cart-item">
                  {/* <div className="cart-image"> */}
                  <img src={item.image} className="cart-image" alt="product" />
                  {/* </div> */}
                    <div className="cart-item-details">
                    <Link to={"/product/" + item.product}/>
                      <div className="cart-item-name">{item.name}</div>
                      <div className="item-quantity">
                      {console.log("qty",item)}
                        Qty:
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(addToCart(item.product, e.target.value))
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          className="button-cart-delete"
                          onClick={() => removeFromCartHandler(item.product)}>
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-price">INR {item.price} </div>
                  </div>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="cart-action">
          <h3>
            Subtotal ( {cartItems.reduce((a, c) => a + parseInt(c.qty), 0)} items) : INR{" "}
            {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
          </h3>
          <button
            onClick={checkoutHandler}
            className="button app-primary full-width"
            disabled={cartItems.length === 0}>
            Proceed to Checkout
          </button>
        </div>
    </div>
  );
};

export default CartScreen;
