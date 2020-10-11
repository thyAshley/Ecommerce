import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import axios from "axios";

import ProductScreen from "./ProductScreen";

const dummyProduct = {
  _id: "1",
  name: "Airpods Wireless Bluetooth Headphones",
  image: "/images/airpods.jpg",
  description:
    "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
  brand: "Apple",
  category: "Electronics",
  price: 89.99,
  countInStock: 10,
  rating: 4.5,
  numReviews: 12,
};
const dummyProduct2 = {
  _id: "1",
  name: "Airpods Wireless Bluetooth Headphones",
  image: "/images/airpods.jpg",
  description:
    "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
  brand: "Apple",
  category: "Electronics",
  price: 89.99,
  countInStock: 0,
  rating: 4.5,
  numReviews: 12,
};

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Render instock product without failure", () => {
  mockedAxios.get.mockResolvedValue({ data: { result: dummyProduct } });
  render(
    <MemoryRouter initialEntries={["/product/1"]}>
      <Route path="/product/:id">
        <ProductScreen />
      </Route>
    </MemoryRouter>
  );
  test("Render component correctly", async () => {
    expect(screen.queryByTestId("product-price")).toBeTruthy();
    expect(screen.queryByTestId("product-description")).toBeTruthy();
    expect(screen.queryByTestId("product-price")).toBeTruthy();
    expect(screen.getByTestId("stock-availability")).toHaveTextContent(/in/i);
    expect(screen.getByTestId("add-button")).toBeEnabled();
  });
});

// describe("Render out-of-stock product without failure", () => {
//   mockedAxios.get.mockResolvedValue({ data: { result: dummyProduct2 } });
//   render(
//     <MemoryRouter initialEntries={["/product/1"]}>
//       <Route path="/product/:id">
//         <ProductScreen />
//       </Route>
//     </MemoryRouter>
//   );
//   test("Render out-of-stock product without failure", async () => {
//     expect(screen.queryByTestId("product-price")).toBeTruthy();
//     expect(screen.queryByTestId("product-description")).toBeTruthy();
//     expect(screen.queryByTestId("product-price")).toBeTruthy();
//     expect(screen.getByTestId("stock-availability")).toHaveTextContent(/out/i);
//     expect(screen.getByTestId("add-button")).not.toBeEnabled();
//   });
// });
