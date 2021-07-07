import Products from "../constants/productConstants"

export const productListReducer = (state = {productList: []}, action)=>{
    // console.log(action.payload);
    switch(action.type){
            
        case Products.PRODUCT_LIST_REQUEST:
            return { loading: true, productList: [] };
        case Products.PRODUCT_LIST_SUCCESS:
            return {loading:false, productList : action.payload };
        case Products.PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };        
        default:
            return state;    
    }

}
export const productDetailsReducer = (state = {product: {} }, action)=>{

    switch(action.type){
            
        case Products.PRODUCT_DETAILS_REQUEST:
            return { loading: true, product: {} };
        case Products.PRODUCT_DETAILS_SUCCESS:
            return {loading:false, product : action.payload };
        case Products.PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };        
        default:
            return state;    
    }

}

export function productDeleteReducer(state = { product: {} }, action) {
    switch (action.type) {
      case Products.PRODUCT_DELETE_REQUEST:
        return { loading: true };
      case Products.PRODUCT_DELETE_SUCCESS:
        return { loading: false, product: action.payload, success: true };
      case Products.PRODUCT_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
export function productSaveReducer(state = { product: {} }, action) {
    switch (action.type) {
      case Products.PRODUCT_SAVE_REQUEST:
        return { loading: true };
      case Products.PRODUCT_SAVE_SUCCESS:
        return { loading: false, success: true, product: action.payload };
      case Products.PRODUCT_SAVE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }