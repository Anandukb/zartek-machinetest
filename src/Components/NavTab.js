import React from "react";

const NavTab = ({ menuList, activeCategory, setActiveCategory }) => {
  return (
    <ul className="nav nav-underline px-3 ">
      {menuList?.map((item, index) => (
        <li className={`nav-item `} key={index}>
          <a
            className={`nav-link text-center ${
              activeCategory === item ? "text-danger active" : "text-secondary"
            }`}
            href="#"
            onClick={() => setActiveCategory(item)}
          >
            {item.menu_category}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default NavTab;
