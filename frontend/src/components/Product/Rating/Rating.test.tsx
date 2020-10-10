import React from "react";
import { render, screen } from "@testing-library/react";
import Rating from "./Rating";

describe("Render <Rating />", () => {
  test("Render without failure", () => {
    render(<Rating value={3} text="test" />);
  });
});
