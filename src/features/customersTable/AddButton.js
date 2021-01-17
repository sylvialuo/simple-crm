import React from "react";
import { useDispatch } from "react-redux";
import { IconButton, Tooltip } from "@material-ui/core";

import { StyledPersonAddIcon } from "./CustomersTable.styles";
import { changeCustomerPopupStatus } from "./customersSlice";

const AddButton = () => {
  const dispatch = useDispatch();
  return (
    <Tooltip title="Add a customer" arrow>
      <IconButton
        onClick={() => {
          dispatch(
            changeCustomerPopupStatus({ isOpen: true, pageName: "ADD" })
          );
        }}
      >
        <StyledPersonAddIcon />
      </IconButton>
    </Tooltip>
  );
};

export default React.memo(AddButton);
