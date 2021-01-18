import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import AddButton from "./AddButton";
import { changeCustomerPopupStatus } from "./customersSlice";

jest.mock("./customersSlice.js", () => ({
  changeCustomerPopupStatus: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
}));

describe("AddButton", () => {
  it("triggers changeCustomerPopupStatus when clicked", () => {
    const mockStore = configureStore();
    const store = mockStore({});
    render(
      <Provider store={store}>
        <AddButton />
      </Provider>
    );
    const addButton = screen.getByTestId("add-button");
    userEvent.click(addButton);

    expect(changeCustomerPopupStatus).toHaveBeenCalled();
    expect(changeCustomerPopupStatus).toHaveBeenCalledWith({
      isOpen: true,
      pageName: "ADD",
    });
  });
});
