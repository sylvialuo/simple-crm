import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import store from "../../app/store";
import { customerPopupState, customersExisted } from "./customersSlice";

import CustomerPopup from "./CustomerPopup";

describe("CustomerPopup", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <CustomerPopup />
      </Provider>
    );
    store.dispatch(
      customersExisted([
        { id: 1, firstName: "Simon", lastName: "Qi", dob: "2012-12-12" },
      ])
    );
  });
  it("should render correct UI elements", () => {
    store.dispatch(customerPopupState({ isOpen: true, pageName: "ADD" }));
    expect(screen.getByTestId("firstName")).toBeInTheDocument();
    expect(screen.getByTestId("lastName")).toBeInTheDocument();
    expect(screen.getByTestId("dob")).toBeInTheDocument();
    expect(screen.getByTestId("cancel-button")).toBeInTheDocument();
    expect(screen.getByTestId("save-button")).toBeInTheDocument();
  });

  it("should show correct page name", () => {
    store.dispatch(customerPopupState({ isOpen: true, pageName: "ADD" }));
    expect(screen.getByText(/add/i)).toBeInTheDocument();
    store.dispatch(
      customerPopupState({
        isOpen: true,
        pageName: "EDIT",
        customerId: 1,
      })
    );
    expect(screen.getByText(/edit/i)).toBeInTheDocument();
  });

  it("should show correct input values", () => {
    store.dispatch(
      customerPopupState({
        isOpen: true,
        pageName: "EDIT",
        customerId: 1,
      })
    );

    expect(screen.getByDisplayValue("Simon")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Qi")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2012-12-12")).toBeInTheDocument();
  });

  it("should allow edit input values", () => {
    store.dispatch(
      customerPopupState({
        isOpen: true,
        pageName: "EDIT",
        customerId: 1,
      })
    );
    const firstName = screen.getByDisplayValue("Simon");
    userEvent.type(firstName, "Gary");
    expect(screen.getByDisplayValue("Gary")).toBeInTheDocument();
  });

  it("should allow clicking cancel button to make popup invisible", () => {
    store.dispatch(
      customerPopupState({
        isOpen: true,
        pageName: "ADD",
      })
    );
    const cancelButton = screen.getByTestId("cancel-button");
    userEvent.click(cancelButton);
    expect(screen.queryByText(/add/i)).not.toBeInTheDocument();
  });
});
