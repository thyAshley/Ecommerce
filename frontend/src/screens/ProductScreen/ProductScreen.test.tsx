import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import ProductScreen from "./ProductScreen";

describe("Test <ProductScreen />", () => {
  test("Render instock product without failure", async () => {
    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Route path="/product/:id">
          <ProductScreen />
        </Route>
      </MemoryRouter>
    );
    expect(screen.queryByTestId("product-price")).toBeTruthy();
    expect(screen.queryByTestId("product-description")).toBeTruthy();
    expect(screen.queryByTestId("product-price")).toBeTruthy();
    expect(screen.getByTestId("stock-availability")).toHaveTextContent(/in/i);
    expect(screen.getByTestId("add-button")).toBeEnabled();
  });

  test("Render out-of-stock product without failure", async () => {
    render(
      <MemoryRouter initialEntries={["/product/6"]}>
        <Route path="/product/:id">
          <ProductScreen />
        </Route>
      </MemoryRouter>
    );
    expect(screen.queryByTestId("product-price")).toBeTruthy();
    expect(screen.queryByTestId("product-description")).toBeTruthy();
    expect(screen.queryByTestId("product-price")).toBeTruthy();
    expect(screen.getByTestId("stock-availability")).toHaveTextContent(/out/i);
    expect(screen.getByTestId("add-button")).not.toBeEnabled();
  });
});
