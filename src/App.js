import React, { useState } from "react";
import { InputAdornment } from "@material-ui/core";
import {
  PageWrapper,
  TitleWrapper,
  Title,
  StyledSearchIcon,
  SearchTextField,
  SearchBarAddButtonWrapper,
} from "./App.styles";
import AddButton from "./features/customersTable/AddButton";
import CustomersTable from "./features/customersTable/CustomersTable";
import CustomerPopup from "./features/customersTable/CustomerPopup";

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <PageWrapper>
      <TitleWrapper>
        <Title variant="h3">Customers Management</Title>
        <SearchBarAddButtonWrapper>
          <SearchTextField
            data-testid="search-bar"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            id="searchBar"
            type="search"
            margin="normal"
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <StyledSearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <AddButton />
        </SearchBarAddButtonWrapper>
      </TitleWrapper>
      <CustomersTable searchValue={searchValue} />
      <CustomerPopup />
    </PageWrapper>
  );
};

export default App;
