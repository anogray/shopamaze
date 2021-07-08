import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import CartScreen from './View/CartScreen';
import HomeScreen from './View/HomeScreen';
import OrderScreen from './View/OrderScreen';
import PaymentScreen from './View/PaymentScreen';
import PlaceOrderScreen from './View/PlaceOrderScreen';
import ProductScreen from './View/ProductScreen';
import ProductsScreen from './View/ProductsScreen';
import RegisterScreen from './View/RegisterScreen';
import ShippingScreen from './View/ShippingScreen';
import SignInScreen from './View/SignInScreen';

function App() {

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;


  const  openMenu = ()=> {
    document.querySelector(".sidebar").classList.add("open");
}
const closeMenu=()=> {
    document.querySelector(".sidebar").classList.remove("open");
}

  return (
    <BrowserRouter>
    <div className="container">
    <header className="header">
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
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
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
          <Route path="/products" component={ProductsScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component = {CartScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          {/* <Route path="/order" component={OrdersScreen} /> */}
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
