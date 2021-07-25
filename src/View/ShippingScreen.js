import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveShipping } from "../redux/actions/cartActions";

const ShippingScreen = (props) => {

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [state, setStates] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
    
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log({ name, state, address, city, postalCode, country })
    dispatch(saveShipping({ name, state, address, city, postalCode, country }));
    props.history.push('payment');
  }
    
    return ( 
        <div className="form">
            <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2>Shipping</h2>
          </li>

          <li>
            <label htmlFor="name">
              Name
          </label>
            <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="address">
              Address
          </label>
            <input type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="state">
              State
          </label>
            <input type="text" name="state" id="state" onChange={(e) => setStates(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="city">
              City
          </label>
            <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="postalCode">
              Postal Code
          </label>
            <input type="text" name="postalCode" id="postalCode" onChange={(e) => setPostalCode(e.target.value)}>
            </input>
          </li>
          <li>
            <label htmlFor="country">
              Country
          </label>
            <input type="text" name="country" id="country" onChange={(e) => setCountry(e.target.value)}>
            </input>
          </li>


          <li>
            <button type="submit" className="button app-primary">Continue</button>
          </li>

        </ul>
      </form>
    </div>
     );
}
 
export default ShippingScreen;