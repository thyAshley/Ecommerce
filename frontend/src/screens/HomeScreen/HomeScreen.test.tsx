import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import HomeScreen from "./HomeScreen";
const dummyProduct = [
  {
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
  },
  {
    _id: "2",
    name: "iPhone 11 Pro 256GB Memory",
    image: "/images/phone.jpg",
    description:
      "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
    brand: "Apple",
    category: "Electronics",
    price: 599.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
];
describe("Render <HomeScreen />", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <HomeScreen products={dummyProduct} />
      </MemoryRouter>
    );
  });

  test("Render title without error", async () => {
    expect(await screen.findByTestId("title")).toBeTruthy();
  });

  test("Render Correct number of Product on HomeScreen", async () => {
    expect(await screen.findAllByTestId("product-info")).toHaveLength(2);
  });
});
