import React from "react";
import "../assets/css/header.css";
import CartIcon from "../assets/images/cart.svg";
const Header = ({ cartItems, data }) => {
  const cartItemsCount = Object.values(cartItems).reduce(
    (sum, count) => sum + count,
    0
  );
  return (
    <nav className="navbar bg-body-tertiary header-container">
      <div className="container-fluid">
        <a className="navbar-brand">{data[0]?.restaurant_name}</a>
        <div className="d-flex px-3" role="search">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link mx-3" aria-current="page" href="#">
                My Orders
              </a>
            </li>
          </ul>
          <div className="cart-icon-container">
            <img src={CartIcon} width={30} alt="" />
            {cartItemsCount > 0 && (
              <span className="cart-count">{cartItemsCount}</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
