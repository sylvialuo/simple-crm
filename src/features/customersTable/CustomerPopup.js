import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

import {
  selectIsCustomerPopupOpen,
  selectPageName,
  changeCustomerPopupStatus,
  addACustomer,
  editACustomer,
  selectCustomerTemp,
  customerTempEditted,
} from "./customersSlice";

const CustomerPopup = () => {
  const dispatch = useDispatch();
  const customerTemp = useSelector(selectCustomerTemp);
  const isCustomerPopupOpen = useSelector(selectIsCustomerPopupOpen);
  const pageName = useSelector(selectPageName);
  const isEditPage = pageName === "EDIT" && !!customerTemp;
  return (
    <Dialog
      open={isCustomerPopupOpen}
      onClose={() =>
        dispatch(changeCustomerPopupStatus({ isOpen: false, pageName: null }))
      }
      aria-labelledby="customer-popup-title"
    >
      <DialogTitle id="customer-popup-title">{`${pageName} A CUSTOMER`}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="firstName"
          label="First Name"
          InputLabelProps={{
            shrink: true,
          }}
          value={customerTemp.firstName}
          onChange={(e) =>
            dispatch(
              customerTempEditted({ key: "firstName", value: e.target.value })
            )
          }
        />
        <TextField
          autoFocus
          margin="dense"
          id="lastName"
          label="Last Name"
          InputLabelProps={{
            shrink: true,
          }}
          value={customerTemp.lastName}
          onChange={(e) =>
            dispatch(
              customerTempEditted({ key: "lastName", value: e.target.value })
            )
          }
        />
        <TextField
          autoFocus
          type="date"
          margin="dense"
          id="dob"
          label="Date of Birth"
          InputLabelProps={{
            shrink: true,
          }}
          value={customerTemp.dob}
          onChange={(e) =>
            dispatch(customerTempEditted({ key: "dob", value: e.target.value }))
          }
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            dispatch(
              changeCustomerPopupStatus({
                isOpen: false,
                pageName: null,
              })
            );
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            isEditPage
              ? dispatch(editACustomer(customerTemp))
              : dispatch(addACustomer(customerTemp));
            dispatch(
              changeCustomerPopupStatus({
                isOpen: false,
                pageName: null,
              })
            );
          }}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(CustomerPopup);
