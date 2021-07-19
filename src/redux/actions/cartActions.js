import axios from "axios"
import cart from "../constants/cartConstants";
import Cookie from "js-cookie";

export const addToCart = (productId, qty) => async(dispatch, getState)=>{

    try{
        const {data} = await axios.get(`/api/products/${productId}`);
        dispatch({type:cart.CART_ADD_ITEM,
            payload:{...data, product: data._id, countInStock: data.countInStock, qty}
        })

        const { cart: { cartItems } } = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
    }
    catch(err){

    }
}

export const saveShipping = (data) => (dispatch) => {
    dispatch({ type: cart.CART_SAVE_SHIPPING, payload: data });
  }

export const removeFromCart = (productId) => (dispatch,getState)=>{
    
    dispatch({type:cart.CART_REMOVE_ITEM, payload:productId});
    
        const { cart: { cartItems } } = getState();
        console.log("removed cartitems",cartItems);
        Cookie.set("cartItems", JSON.stringify(cartItems));
}

export const savePayment = (data) => (dispatch) => {
    dispatch({ type: cart.CART_SAVE_PAYMENT, payload: data });
  }

export const clearCartSuccess = ()=> (dispatch) =>{
  
    dispatch({type:cart.CART_CLEAR_PAYMENT});

}