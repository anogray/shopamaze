import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, Link, Redirect  } from 'react-router-dom'
import CartScreen from './View/CartScreen';
import HomeScreen from './View/HomeScreen';
import OrderScreen from './View/OrderScreen';
import OrdersScreen from './View/OrdersScreen';
import PaymentScreen from './View/PaymentScreen';
import PlaceOrderScreen from './View/PlaceOrderScreen';
import ProductScreen from './View/ProductScreen';
import ProductsScreen from './View/ProductsScreen';
import ProfileScreen from './View/ProfileScreen';
import RegisterScreen from './View/RegisterScreen';
import ShippingScreen from './View/ShippingScreen';
import SignInScreen from './View/SignInScreen';
import Verification from './View/Verification';
import {Modal, Button, NavDropdown} from "react-bootstrap";
import { useState } from 'react';
import OrderHistory from './View/OrderHistory';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { logout } from './redux/actions/userActions';


function App() {

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();


  const  openMenu = ()=> {
    document.querySelector(".sidebar").classList.add("open");
}
const closeMenu=()=> {
    document.querySelector(".sidebar").classList.remove("open");
}


 const signOutHandle = ()=>{

    
    dispatch(logout());
    
 }



  return (
    <BrowserRouter>
    <div className="container-main">
    <header className="header-app">
        <div className="brand">
            <button onClick={openMenu}>
                &#9776;
            </button>
            <Link to ="/">shopamaze</Link>
        </div>
        <div className="header-links">
        <Link to ="/cart">Cart</Link>
        
        {/* SignInScreen */}
        {userInfo ? (
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
              <div className="dropdown-box">
                {/* <NavDropdown.Item href="/products">Action</NavDropdown.Item> */}
                
                <NavDropdown.Item><Link to="/orderhistory">Orders</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/products">Product</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/" onClick={signOutHandle}>Sign Out</Link></NavDropdown.Item>
                {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
                </div>
            </NavDropdown>

            ) : (
              <div className="account-handle">
              <Link to ="/signin">Hello Sign In</Link>
              </div>
            )}
              
            
        </div>
    </header>
    

    <aside className="sidebar">
        <div className="sidebar-header">
        <h3>Shopping Categories</h3>
        <button className="sidebar-close" onClick={closeMenu}>X</button>
    </div>
        <ul>
            <li>
                <a href="index.html">Pants</a>
            </li>
            <li>
                <a href="index.html">Shirts</a>
            </li>
        </ul>
    </aside>
    <main className="main">
        <div className="content">
        <Switch>
          <Route exact path="/"  component={HomeScreen} />
          <Route path="/signin" component = {SignInScreen} />
          <Route path="/register" component={RegisterScreen} />
          {userInfo &&  userInfo.isAdmin && <Route exact path="/products" component={ProductsScreen} />}
          {<Route exact path="/product/:id" component={ProductScreen} />}
          <Route path="/cart/:id?" component = {CartScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/orderhistory" component={OrderHistory} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/orders" component={OrdersScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/verification" component={Verification} />
          <Redirect to ="/"></Redirect>
        </Switch>
        </div>
    </main>
    <div className="footer">
    <footer className="footer">
        All right reserved. &nbsp;&nbsp; &copy;
    </footer>
    </div>
</div>
</BrowserRouter>
  );
}

export default App;
