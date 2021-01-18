import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import { waitForElementToBeRemoved } from "@testing-library/dom";
import { Provider } from "react-redux";
import store from "./app/store";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { customersExisted } from "./features/customersTable/customersSlice";

describe("App", () => {
  it("should allow type in the search bar and show the search result", async () => {
    render(
      <Provider store={store}>
        <App />
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

    const searchBar = screen.getByTestId("search-bar").querySelector("input");

    userEvent.type(searchBar, "abc");
  });
});
