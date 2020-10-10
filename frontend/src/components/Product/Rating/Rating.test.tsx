import React from "react";
import { render, screen } from "@testing-library/react";
import Rating from "./Rating";

describe("Render <Rating />", () => {
  test("Render number of stars correctly (half star)", () => {
    render(<Rating value={2.88} />);
    const half = screen.queryAllByTestId(/half-rating/i);
    expect(half).toHaveLength(1);
    const reviewText = screen.queryByTestId(/review-text/i);
    expect(reviewText).toHaveTextContent("");
  });

  test("Render number of stars correctly (whole number)", () => {
    render(<Rating value={4} />);
    const full = screen.queryAllByTestId(/full-rating/i);
    expect(full).toHaveLength(4);
    const reviewText = screen.queryByTestId(/review-text/i);
    expect(reviewText).toHaveTextContent("");
  });

  test("Render number of stars correctly (No stars) and text content", () => {
    render(<Rating value={0} text="test" />);
    const none = screen.queryAllByTestId(/no-rating/i);
    expect(none).toHaveLength(5);
    const reviewText = screen.queryByTestId(/review-text/i);
    expect(reviewText).toHaveTextContent("test");
  });
});
