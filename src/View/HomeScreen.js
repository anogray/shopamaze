import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {listProducts} from '../redux/actions/productActions';
import Loader from '../components/Loader';
import domainType from "../components/utils";

export default function HomeScreen(){

    // const [products, setProduct] = useState([])
    const productsList  = useSelector(state=>state.productList);
    const {productList, loading, error} = productsList;
    const dispatch = useDispatch();
    console.log("domaintype",domainType());
    console.log("loadingErr",loading,"error",error,"productlist",productList);

    useEffect(() => {
        dispatch(listProducts());
        return () => {
            //
        }
    }, [])
    
    return(
        <>
        {loading ? (
          <Loader/>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <ul className="products">
              {productList.map((product) => (
                <li key={product._id}>
                  <div className="product">
                    <Link to={'/product/' + product._id}>
                      <img
                        className="product-image"
                        src={product.image}
                        alt="product"
                      />
                    </Link>
                    <div className="product-name">
                      <Link to={'/product/' + product._id}>{product.name}</Link>
                    </div>
                    <div className="product-brand">{product.brand}</div>
                    <div className="product-price">${product.price}</div>
                    {/* <div className="product-rating">{product.ratings} Stars ({product.numReviews} Reviews)</div>  */}
                  </div>
                </li>
              ))}
            </ul>
          )}
          </>
    )
}

