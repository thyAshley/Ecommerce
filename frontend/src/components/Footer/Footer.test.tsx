import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Render <Footer />", () => {
  render(<Footer />);
  test("Render Footer without error", async () => {
    const footerContent = await screen.findByTestId(/footer-text/);
    expect(footerContent).toHaveTextContent(/copyright ©/i);
  });
});
