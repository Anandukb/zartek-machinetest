import "./App.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Components/Header";
import NavTab from "./Components/NavTab";
import { getDishesList } from "./app/dishesSlice";
import vegIcon from "./assets/images/veg-icon.png";
import nonIcon from "./assets/images/nonveg-icon.png";

function App() {
  const { data, loading } = useSelector((state) => state.dishes);
  const [activeCategory, setActiveCategory] = useState();
  const [sortedData, setSortedData] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDishesList());
  }, []);

  useEffect(() => {
    setActiveCategory(data[0]?.table_menu_list[0]);
  }, [data]);

  useEffect(() => {
    if (activeCategory) {
      const data = [...activeCategory?.category_dishes];
      data?.sort((a, b) => {
        if (a.dish_Availability && !b.dish_Availability) {
          return -1;
        }
        if (!a.dish_Availability && b.dish_Availability) {
          return 1;
        }
        return 0;
      });
      setSortedData(data);
    }
  }, [activeCategory]);

  const increaseCount = (item) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      const count = updatedCartItems[item.dish_id] || 0;
      updatedCartItems[item.dish_id] = count + 1;
      return updatedCartItems;
    });
  };

  const decreaseCount = (item) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = { ...prevCartItems };
      const count = updatedCartItems[item.dish_id] || 0;
      if (count > 0) {
        updatedCartItems[item.dish_id] = count - 1;
      }
      return updatedCartItems;
    });
  };
  return (
    <div className="App">
      {loading ? (
        <div class="component-container">
          <div class="spinner-container">
            <div class="spinner-grow" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="header-tab border-bottom">
            <Header
              {...{ cartItems, data, activeCategory, setActiveCategory }}
            />
            <NavTab
              {...{
                menuList: data[0]?.table_menu_list,
                setActiveCategory,
                activeCategory,
              }}
            />
          </div>

          <div className="page-container">
            {sortedData?.map((item, index) => (
              <div
                className="d-flex mb-3 pb-2 align-items-start border-bottom "
                key={index}
              >
                <div className="p-2 icon-img">
                  <img
                    src={item?.dish_Type === 2 ? vegIcon : nonIcon}
                    width={15}
                    height={15}
                    alt=""
                  />
                </div>
                <div className="me-auto pe-2 text-start dish-details">
                  <p>
                    <b>{item?.dish_name}</b>
                  </p>
                  <p>
                    <b>SAR {item?.dish_price}</b>
                  </p>
                  <p>{item?.dish_description}</p>
                  {!item?.dish_Availability ? (
                    <p className="text-danger">Not Available</p>
                  ) : (
                    <>
                      <div
                        className="btn-group btn-group-sm count-btn"
                        role="group"
                        aria-label="Basic example"
                      >
                        <button
                          type="button"
                          className="btn btn-success rounded-start-pill"
                          onClick={() => decreaseCount(item)}
                        >
                          -
                        </button>

                        <div className="text-white bg-success count">
                          {cartItems[item.dish_id] || 0}
                        </div>

                        <button
                          type="button"
                          className="btn btn-success rounded-end-pill"
                          onClick={() => increaseCount(item)}
                        >
                          +
                        </button>
                      </div>
                      {item?.addonCat?.length > 0 && (
                        <p className="m-0 p-0 text-danger">
                          Customization Available
                        </p>
                      )}
                    </>
                  )}
                </div>
                <div className="p-2 me-2 my-auto calorie">
                  {item?.dish_calories} Calories
                </div>
                <div className="p-2 my-auto">
                  <img
                    className=""
                    width="60"
                    height="60"
                    src={item?.dish_image}
                    alt=""
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
