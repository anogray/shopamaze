import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import data from "../data"
import {detailsProduct} from '../redux/actions/productActions';
import Loader from '../components/Loader';


export default function ProductScreen(props){
      
      const prodId = props.match.params.id;
      const productDetails = useSelector(state => state.productDetails);
      const {loading, error, product} = productDetails;
      const dispatch = useDispatch();

      const [qty, setQty] = useState(1)

      useEffect(() => {
        dispatch(detailsProduct(prodId));
        return () => {
          
        }
      }, [])

      const handleAddToCart = () => {
        console.log("addingcart",props.match.params.id);
        props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
      };
      
    return(
        <>
        <div className="back-to-result">
            <Link to="/">Back to result</Link>
        </div>
        {loading ? <Loader/> : 
        error ? <div>{error}</div> :
        (
        <div className="details">
        <div className="details-image">
            <img src={product.image} alt="product" />
        </div>
        <div className="details-info">
            <ul>
                <li>{product.name}</li>
                <li>{product.rating} Stars ({product.numReviews} Reviews)</li>
                <li>
                Price :
                <strong>
                    {product.price}
                </strong>
                </li>
                {product.description && <li>
                  Description:
                  <div>{product.description}</div>
                </li>
                }
            </ul>
        </div>
        <div className="details-action">
              <ul>
                <li>Price: {product.price}</li>
                <li>
                  Status:{' '}
                  {product.countInStock > 0 ? 'In Stock' : 'Unavailable.'}
                </li>
                <li>
                  Qty: <select value ={qty} onChange = {(e)=>setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                        </option>
                  ))}
                  </select>
                </li>
                <li>
                {product.countInStock > 0 && (
                    <button
                      onClick={handleAddToCart}
                      className="button app-primary">
                      Add to Cart
                    </button>
                )} 
                </li>
             </ul>
        </div>
        </div>
        )
        } 
        
        </>
    )
}

