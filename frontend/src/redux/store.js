import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import chekoutReducer from "./slices/checkoutSlice";
import orderReducer from "./slices/orderSlice";
import adminReducer from "./slices/adminSlice";
import adminProductReducer from "./slices/adminProductSlice";
import adminOrdersReducer from "./slices/adminOrderSlice";

const store = configureStore({
   reducer : {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    checkout: chekoutReducer,
    order: orderReducer,
    admin: adminReducer,
    adminProducts: adminProductReducer,
    adminOrders: adminOrdersReducer,
   },
});

export default store;
