import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import store from "../../app/store";
import { changeCustomerPopupStatus, deleteACustomer } from "./customersSlice";

import CustomersTableRow from "./CustomersTableRow";

jest.mock("./customersSlice.js", () => ({
  changeCustomerPopupStatus: jest.fn(),
  deleteACustomer: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
}));

describe("CustomersTableRow", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <CustomersTableRow
          customer={{
            id: 1,
            firstName: "Simon",
            lastName: "Qi",
            dob: "2002-10-10",
          }}
        />
      </Provider>
    );
  });
  it("should render correct customer data", () => {
    expect(screen.getByText(/simon/i)).toBeInTheDocument();
    expect(screen.getByText(/qi/i)).toBeInTheDocument();
    expect(screen.getByText(/2002-10-10/i)).toBeInTheDocument();
  });

  it("should render two buttons", () => {
    expect(screen.getByTestId("delete-button")).toBeInTheDocument();
    expect(screen.getByTestId("edit-button")).toBeInTheDocument();
  });

  it("should call changeCustomerPopupStatus when click edit button", () => {
    const editButton = screen.getByTestId("edit-button");
    userEvent.click(editButton);
    expect(changeCustomerPopupStatus).toHaveBeenCalled();
    expect(changeCustomerPopupStatus).toHaveBeenCalledWith({
      isOpen: true,
      pageName: "EDIT",
      customerId: 1,
    });
  });

  it("should call deleteACustomer when click delete button", () => {
    const deleteButton = screen.getByTestId("delete-button");
    userEvent.click(deleteButton);
    expect(deleteACustomer).toHaveBeenCalled();
    expect(deleteACustomer).toHaveBeenCalledWith(1);
  });
});
