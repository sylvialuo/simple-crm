import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";

import store from "../../app/store";
import { customersExisted } from "./customersSlice";

import CustomersTable, { getSearchedCustomers } from "./CustomersTable";

describe("CustomersTable", () => {
  it("should render correct table header", () => {
    render(
      <Provider store={store}>
        <CustomersTable />
      </Provider>
    );
    store.dispatch(
      customersExisted([
        { id: 1, firstName: "Simon", lastName: "Qi", dob: "2012-12-12" },
        { id: 2, firstName: "Haha", lastName: "Ha", dob: "2012-12-12" },
      ])
    );

    expect(screen.getByText(/customer id/i)).toBeInTheDocument();
    expect(screen.getByText(/first name/i)).toBeInTheDocument();
    expect(screen.getByText(/last name/i)).toBeInTheDocument();
    expect(screen.getByText(/date of birth/i)).toBeInTheDocument();
  });

  it("should show all customers when there is not search content", () => {
    render(
      <Provider store={store}>
        <CustomersTable />
      </Provider>
    );
    store.dispatch(
      customersExisted([
        { id: 1, firstName: "Simon", lastName: "Qi", dob: "2012-12-12" },
        { id: 2, firstName: "Haha", lastName: "Ha", dob: "2012-12-12" },
      ])
    );

    expect(screen.getByText(/simon/i)).toBeInTheDocument();
    expect(screen.getByText(/haha/i)).toBeInTheDocument();
  });

  it("should show selected customers when there is search content", () => {
    render(
      <Provider store={store}>
        <CustomersTable searchValue="haha" />
      </Provider>
    );
    store.dispatch(
      customersExisted([
        { id: 1, firstName: "Simon", lastName: "Qi", dob: "2012-12-12" },
        { id: 2, firstName: "Haha", lastName: "Ha", dob: "2012-12-12" },
      ])
    );

    expect(screen.queryByText(/simon/i)).not.toBeInTheDocument();
    expect(screen.getByText(/haha/i)).toBeInTheDocument();
  });
  it("should show selected customers when there is search content", () => {
    render(
      <Provider store={store}>
        <CustomersTable searchValue="haha" />
      </Provider>
    );
    store.dispatch(
      customersExisted([
        { id: 1, firstName: "Simon", lastName: "Qi", dob: "2012-12-12" },
        { id: 2, firstName: "Haha", lastName: "Ha", dob: "2012-12-12" },
      ])
    );

    expect(screen.queryByText(/simon/i)).not.toBeInTheDocument();
    expect(screen.getByText(/haha/i)).toBeInTheDocument();
  });

  it("should show no exist customer or no matched customer message, when no customers search matched", () => {
    render(
      <Provider store={store}>
        <CustomersTable />
      </Provider>
    );
    store.dispatch(customersExisted([]));

    expect(
      screen.getByText(/There is no exist customer or no matched customer./i)
    ).toBeInTheDocument();
  });
});

describe("getSearchedCustomers", () => {
  it("should return match customers with eithor firstName or lastName contains the searchValue", () => {
    const customers = [
      { firstName: "Gary", lastName: "Pat" },
      { firstName: "Simon", lastName: "Qi" },
    ];

    const searchValue = "ary";
    expect(getSearchedCustomers(searchValue, customers)).toEqual([
      customers[0],
    ]);
  });

  it("should return customers when searchValue is falsy", () => {
    const customers = [
      { firstName: "Gary", lastName: "Pat" },
      { firstName: "Simon", lastName: "Qi" },
    ];

    const searchValue = "";
    expect(getSearchedCustomers(searchValue, customers)).toEqual(customers);
  });

  it("should return [] when no customers match searchValue", () => {
    const customers = [
      { firstName: "Gary", lastName: "Pat" },
      { firstName: "Simon", lastName: "Qi" },
    ];

    const searchValue = "abc";
    expect(getSearchedCustomers(searchValue, customers)).toEqual([]);
  });
});
