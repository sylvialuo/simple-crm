import customers, {
  initialState,
  customersExisted,
  requestStarted,
  requestFailed,
  customerDeleted,
  customerAdded,
  customerEdited,
  customerPopupState,
  customerTempEditted,
} from "./customersSlice";

describe("customers reducer", () => {
  it("should handle initial state", () => {
    expect(customers(undefined, {})).toEqual(initialState);
  });

  it("should handle customersExisted", () => {
    const customersPayload = ["c1", "c2"];
    expect(
      customers(
        { ...initialState, isLoading: true },
        {
          type: customersExisted.type,
          payload: customersPayload,
        }
      )
    ).toEqual({
      ...initialState,
      customers: customersPayload,
      isLoading: false,
    });
  });

  it("should handle requestStarted", () => {
    expect(
      customers(
        { ...initialState },
        {
          type: requestStarted.type,
        }
      )
    ).toEqual({ ...initialState, isLoading: true });
  });

  it("should handle requestFailed", () => {
    expect(
      customers(
        { ...initialState, isLoading: true },
        {
          type: requestFailed.type,
        }
      )
    ).toEqual({ ...initialState, isLoading: false });
  });
  it("should handle customerDeleted", () => {
    const customersExisted = [{ id: 1 }, { id: 2 }];

    expect(
      customers(
        { ...initialState, customers: customersExisted },
        {
          type: customerDeleted.type,
          payload: 1,
        }
      )
    ).toEqual({
      ...initialState,
      customers: [customersExisted[1]],
    });
  });
  it("should handle customerAdded", () => {
    const customersExisted = [{ id: 1 }, { id: 2 }];
    expect(
      customers(
        { ...initialState, customers: customersExisted },
        {
          type: customerAdded.type,
          payload: { id: 0 },
        }
      )
    ).toEqual({
      ...initialState,
      customers: [{ id: 0 }, ...customersExisted],
    });
  });

  it("should handle customerEdited", () => {
    const customersExisted = [
      { id: 1, firstName: "A" },
      { id: 2, firstName: "B" },
    ];
    const customerPayload = { id: 1, firstName: "C" };
    expect(
      customers(
        { ...initialState, customers: customersExisted },
        {
          type: customerEdited.type,
          payload: customerPayload,
        }
      )
    ).toEqual({
      ...initialState,
      customers: [customerPayload, customersExisted[1]],
    });
  });
  describe("customerPopupState", () => {
    it("should handle ADD", () => {
      const popupPayload = { isOpen: true, pageName: "ADD" };
      expect(
        customers(
          { ...initialState },
          {
            type: customerPopupState.type,
            payload: popupPayload,
          }
        )
      ).toEqual({
        ...initialState,
        isCustomerPopupOpen: true,
        pageName: "ADD",
      });
    });
    it("should handle EDIT", () => {
      const popupPayload = { isOpen: true, pageName: "EDIT", customerId: 1 };
      const initCustomers = [{ id: 1 }];
      expect(
        customers(
          { ...initialState, customers: initCustomers },
          {
            type: customerPopupState.type,
            payload: popupPayload,
          }
        )
      ).toEqual({
        ...initialState,
        isCustomerPopupOpen: true,
        pageName: "EDIT",
        customerTemp: initCustomers[0],
        customers: initCustomers,
      });
    });
  });
  it("should handle customerTempEditted", () => {
    const tempPayload = { key: "firstName", value: "B" };
    const initCustomerValue = { firstName: "A" };
    expect(
      customers(
        { ...initialState, customerTemp: initCustomerValue },
        {
          type: customerTempEditted.type,
          payload: tempPayload,
        }
      )
    ).toEqual({
      ...initialState,
      customerTemp: { firstName: "B" },
    });
  });
});
