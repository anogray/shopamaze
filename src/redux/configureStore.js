import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import { productDeleteReducer, productDetailsReducer, productListReducer, productSaveReducer } from './reducers/productReducer';
import {cartReducer} from "../redux/reducers/cartReducer";
import Cookie from "js-cookie";
import { userRegisterReducer, userSigninReducer } from './reducers/userReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {cart : {cartItems} };
console.log("initialState",initialState);

const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    cart : cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,

})


// export const configureStore = ()=>{
//     const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
//     return store;
// }
const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));

export default store;