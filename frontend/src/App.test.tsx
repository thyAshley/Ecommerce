import React from "react";
import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import App from "./App";

describe("Testing <App />", () => {
  test("Render Component without failure", async () => {
    render(<App />);
    const footer = await screen.findByTestId(/footer-component/i);
    expect(footer).toBeTruthy();
    const header = await screen.findByTestId(/header-component/i);
    expect(header).toBeTruthy();
  });
});

describe("Testing Route", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });

  test("Route to Cart Page", () => {
    expect(screen.findByTestId(/navlink-cart/i));
    UserEvent.click(screen.getByTestId(/navlink-cart/i));
    expect(screen.getByText(/cart page/i));
  });
});
