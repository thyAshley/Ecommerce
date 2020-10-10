import React from "react";
import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import App from "./App";

describe("Testing <App />", () => {
  test("Render Component without failure", async () => {
    render(<App />);
    const title = await screen.findByTestId(/title/i);
    expect(title).toHaveTextContent(/latest products/i);
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
  test("Route to Product Page", () => {
    expect(screen.getByText(/Airpods/i));
    UserEvent.click(screen.getByText(/Airpods/i));
    expect(screen.getByText(/products/i));
  });

  test("Route to Cart Page", () => {
    expect(screen.getByText(/cart/i));
    UserEvent.click(screen.getByText(/cart/i));
    expect(screen.getByText(/cart page/i));
  });
});
