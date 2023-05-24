import { configureStore } from "@reduxjs/toolkit";
import dishesReducer from "./dishesSlice";

export default configureStore({
  reducer: { dishes: dishesReducer },
});
