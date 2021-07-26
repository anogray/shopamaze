import axios from "axios";
import Product from "../constants/productConstants";

import domainType from "../../components/utils";


const backDomain = domainType();

const dispatchProduct = (data)=>{
    return{
        type:Product.PRODUCT_LIST_SUCCESS,
        payload:data.data
    }
}

const productErr = (err)=>{
    return{
        type : Product.PRODUCT_DETAILS_FAIL,
        payload : err.message
    }
}
const listProducts = () => async(dispatch)=>{
    
    try{
        dispatch({type:Product.PRODUCT_LIST_REQUEST});
        const {data} = await axios.get(backDomain+"/api/products/");
        console.log("dispatchData",data);
        dispatch(dispatchProduct(data));
    }
    catch(err){
        dispatch(productErr(err));
    }
}

const detailsProduct = (productId)=> async(dispatch)=>{
    try{
        dispatch({type:Product.PRODUCT_DETAILS_REQUEST});
        const {data} = await axios.get(backDomain+`/api/products/${productId}`);
        console.log("prodData",data);

        dispatch({type:Product.PRODUCT_DETAILS_SUCCESS, payload:data});
    }
    catch(err){
        dispatch({type:Product.PRODUCT_DETAILS_FAIL, payload:err.message});
    }
}

const saveProduct = (product) => async (dispatch, getState) => {
  console.log("saveProduct",product);
    try {
      dispatch({ type: Product.PRODUCT_SAVE_REQUEST, payload: product });
      const {
        userSignin: { userInfo },
      } = getState();
      if (!product._id) {
        const { data } = await axios.post(backDomain+'/api/products', product, {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        });
        dispatch({ type: Product.PRODUCT_SAVE_SUCCESS, payload: data });
      } else {
        console.log("else put product",userInfo);
        const { data } = await axios.put(
          backDomain+'/api/products/' + product._id,
          product,
          {
            headers: {
              Authorization: 'Bearer ' + userInfo.token,
            },
          }
        );
        dispatch({ type: Product.PRODUCT_SAVE_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({ type: Product.PRODUCT_SAVE_FAIL, payload: error.message });
    }
  };

  
  const deleteProduct = (productId) => async (dispatch, getState) => {
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      dispatch({ type: Product.PRODUCT_DELETE_REQUEST, payload: productId });
      const { data } = await axios.delete(backDomain+'/api/products/' + productId, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      });
      dispatch({ type: Product.PRODUCT_DELETE_SUCCESS, payload: data, success: true });
    } catch (error) {
      dispatch({ type: Product.PRODUCT_DELETE_FAIL, payload: error.message });
    }
  };

export  { listProducts, detailsProduct, saveProduct, deleteProduct  };