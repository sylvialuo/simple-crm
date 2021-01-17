import { configureStore } from "@reduxjs/toolkit";
import customersReducer from "../features/customersTable/customersSlice";

export default configureStore({
  reducer: {
    customers: customersReducer,
  },
});
