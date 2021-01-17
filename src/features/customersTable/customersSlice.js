import Axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
  isLoading: false,
  isCustomerPopupOpen: false,
  pageName: null,
  customerTemp: {
    firstName: "",
    lastName: "",
    dob: "",
  },
  searchValue: "",
};

const normalizeById = (customers) => {
  const allCustomers = customers.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.id]: { ...cur },
    }),
    {}
  );

  const allIds = customers.map((c) => c.id);

  return { allCustomers, allIds };
};

export const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    customersExisted: (state, action) => {
      state.customers = action.payload;
      state.isLoading = false;
    },
    requestStarted: (state) => {
      state.isLoading = true;
    },
    requestFailed: (state) => {
      state.isLoading = false;
    },
    customerDeleted: (state, action) => {
      state.customers = state.customers.filter(
        ({ id }) => id !== action.payload
      );
    },
    customerAdded: (state, action) => {
      state.customers.unshift(action.payload);
    },
    customerEdited: (state, action) => {
      const index = state.customers.findIndex(
        (customer) => customer.id === action.payload.id
      );
      state.customers[index] = action.payload;
    },
    customerPopupState: (state, action) => {
      const { isOpen, pageName, customerId } = action.payload;
      state.isCustomerPopupOpen = isOpen;
      state.pageName = pageName;
      if (pageName === "EDIT")
        state.customerTemp = state.customers.find((c) => c.id === customerId);

      if (!isOpen) state.customerTemp = initialState.customerTemp;
    },
    customerTempEditted: (state, action) => {
      const { key, value } = action.payload;
      state.customerTemp[key] = value;
    },
  },
});

export const {
  customersExisted,
  requestStarted,
  requestFailed,
  customerDeleted,
  customerAdded,
  customerEdited,
  customerPopupState,
  customerTempEditted,
} = customersSlice.actions;

const axios = Axios.create({
  baseURL: "http://localhost:3001",
});

export const getCustomers = () => (dispatch) => {
  dispatch(requestStarted());
  axios
    .get("/customers")
    .then((res) => dispatch(customersExisted(res.data)))
    .catch((err) => dispatch(requestFailed()));
};

export const deleteACustomer = (id) => (dispatch) => {
  dispatch(requestStarted());
  axios
    .delete(`/customers/${id}`)
    .then((res) => dispatch(customerDeleted(id)))
    .catch((err) => dispatch(requestFailed()));
};

export const addACustomer = (customerDetails) => (dispatch) => {
  dispatch(requestStarted());
  axios
    .post(`/customers`, customerDetails)
    .then((res) => dispatch(customerAdded(res.data)))
    .catch((err) => dispatch(requestFailed()));
};

export const editACustomer = (customerDetails) => (dispatch) => {
  dispatch(requestStarted());
  axios
    .put(`/customers/${customerDetails.id}`, customerDetails)
    .then((res) => dispatch(customerEdited(customerDetails)))
    .catch((err) => dispatch(requestFailed()));
};

export const changeCustomerPopupStatus = (status) => (dispatch) => {
  dispatch(customerPopupState(status));
};

export const selectCustomers = (state) => state.customers.customers;
export const selectIsCustomerPopupOpen = (state) =>
  state.customers.isCustomerPopupOpen;
export const selectPageName = (state) => state.customers.pageName;
export const selectCustomerTemp = (state) => state.customers.customerTemp;

export default customersSlice.reducer;
