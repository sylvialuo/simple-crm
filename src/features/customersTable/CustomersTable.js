import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

import CustomersTableRow from "./CustomersTableRow";
import { getCustomers, selectCustomers } from "./customersSlice";
import { useDebounce } from "../../utils";

export const getSearchedCustomers = (searchValue, customers) => {
  if (!searchValue) return customers;
  return customers.filter(
    (c) =>
      c.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
      c.lastName.toLowerCase().includes(searchValue.toLowerCase())
  );
};

const CustomersTable = ({ searchValue }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const customers = useSelector(selectCustomers);
  const searchedCustomers = getSearchedCustomers(
    debouncedSearchValue,
    customers
  );
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customer table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Customer ID</TableCell>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">Date of Birth</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchedCustomers.length !== 0 &&
            searchedCustomers.map((customer) => (
              <CustomersTableRow customer={customer} key={customer.id} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(CustomersTable);
