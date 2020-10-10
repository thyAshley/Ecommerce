import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Header from "./Header";

describe("Test <Header /> Without Error", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });
  test("Render Navlinks without error", async () => {
    const home = await screen.findByTestId(/navlink-home/i);
    expect(home).toHaveAttribute("href", "/");
    const login = await screen.findByTestId(/navlink-login/i);
    expect(login).toHaveAttribute("href", "/login");
    const cart = await screen.findByTestId(/navlink-cart/i);
    expect(cart).toHaveAttribute("href", "/cart");
  });
});
