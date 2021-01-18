import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
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
import {
  PopupTextField,
  TextFieldWrapper,
  ButtonWrapper,
  PopupButton,
  PopupWrapper,
} from "./CustomersTable.styles";

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
      <PopupWrapper>
        <DialogTitle id="customer-popup-title">{`${pageName} A CUSTOMER`}</DialogTitle>
        <DialogContent>
          <TextFieldWrapper>
            <PopupTextField
              data-testid="firstName"
              margin="dense"
              id="firstName"
              label="First Name"
              InputLabelProps={{
                shrink: true,
              }}
              value={customerTemp.firstName}
              onChange={(e) =>
                dispatch(
                  customerTempEditted({
                    key: "firstName",
                    value: e.target.value,
                  })
                )
              }
            />
            <PopupTextField
              data-testid="lastName"
              margin="dense"
              id="lastName"
              label="Last Name"
              InputLabelProps={{
                shrink: true,
              }}
              value={customerTemp.lastName}
              onChange={(e) =>
                dispatch(
                  customerTempEditted({
                    key: "lastName",
                    value: e.target.value,
                  })
                )
              }
            />
            <PopupTextField
              data-testid="dob"
              type="date"
              margin="dense"
              id="dob"
              label="Date of Birth"
              InputLabelProps={{
                shrink: true,
              }}
              value={customerTemp.dob}
              onChange={(e) =>
                dispatch(
                  customerTempEditted({ key: "dob", value: e.target.value })
                )
              }
            />
          </TextFieldWrapper>
        </DialogContent>
        <DialogActions>
          <ButtonWrapper>
            <PopupButton
              onClick={() => {
                dispatch(
                  changeCustomerPopupStatus({
                    isOpen: false,
                    pageName: null,
                  })
                );
              }}
              data-testid="cancel-button"
            >
              Cancel
            </PopupButton>
            <PopupButton
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
              data-testid="save-button"
            >
              Save
            </PopupButton>
          </ButtonWrapper>
        </DialogActions>
      </PopupWrapper>
    </Dialog>
  );
};

export default React.memo(CustomerPopup);
