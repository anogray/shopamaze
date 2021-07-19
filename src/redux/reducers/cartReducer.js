import cart from "../constants/cartConstants";

export const cartReducer = (state={cartItems:[]}, action) => {
        
    switch(action.type){
            
        case cart.CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x => x.product === item.product);
            if (product) {
              return {
                cartItems:
                  state.cartItems.map(x => x.product === product.product ? item : x)
              };
            }

            return {cartItems : [...state.cartItems, item ]}
        
        case cart.CART_REMOVE_ITEM:
            const productId = action.payload;
            return {cartItems : state.cartItems.filter(item => item.product !== productId)};    

        case cart.CART_SAVE_SHIPPING:
            return { ...state, shipping: action.payload };
            
        case cart.CART_SAVE_PAYMENT:
            return {...state, payment: action.payload};    

        case cart.CART_CLEAR_PAYMENT:
            return {cartItems:[]}

        default:
            return state;
    }
}