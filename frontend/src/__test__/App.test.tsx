import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

test("Render App without failure", () => {
  const container = render(<App />);
  console.log(container);
});
