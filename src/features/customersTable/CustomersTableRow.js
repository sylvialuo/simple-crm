import React from "react";
import { useDispatch } from "react-redux";
import { TableRow, TableCell, Tooltip, IconButton } from "@material-ui/core";

import {
  StyledEditIcon,
  StyledDeleteIcon,
  ActionsWrapper,
} from "./CustomersTable.styles";
import { deleteACustomer, changeCustomerPopupStatus } from "./customersSlice";

const CustomersTableRow = ({ customer }) => {
  const dispatch = useDispatch();
  return (
    <TableRow>
      <TableCell align="center">{customer.id}</TableCell>
      <TableCell align="center">{customer.firstName}</TableCell>
      <TableCell align="center">{customer.lastName}</TableCell>
      <TableCell align="center">{customer.dob}</TableCell>
      <TableCell align="center">
        <ActionsWrapper>
          <Tooltip title="Edit a customer" arrow>
            <IconButton
              data-testid="edit-button"
              onClick={() => {
                dispatch(
                  changeCustomerPopupStatus({
                    isOpen: true,
                    pageName: "EDIT",
                    customerId: customer.id,
                  })
                );
              }}
            >
              <StyledEditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete a customer" arrow>
            <IconButton
              data-testid="delete-button"
              onClick={() => dispatch(deleteACustomer(customer.id))}
            >
              <StyledDeleteIcon />
            </IconButton>
          </Tooltip>
        </ActionsWrapper>
      </TableCell>
    </TableRow>
  );
};

export default React.memo(CustomersTableRow);
