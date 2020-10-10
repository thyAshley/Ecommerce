import React from "react";
import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
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
  test("route to homepage", async () => {
    render(<App />);
    UserEvent.click(await screen.findByTestId(/navlink-home/i));
    const title = await screen.findByTestId(/title/i);
    expect(title).toHaveTextContent(/latest products/i);
  });
});
