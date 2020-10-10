import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Testing <App />", () => {
  render(<App />);
  test("Render Component without failure", async () => {
    const headerText = await screen.findByTestId(/welcome-header/i);
    expect(headerText).toHaveTextContent(/welcome/i);
    const footer = await screen.findByTestId(/footer-component/i);
    expect(footer).toBeTruthy();
    const header = await screen.findByTestId(/header-component/i);
    expect(header).toBeTruthy();
  });
});
