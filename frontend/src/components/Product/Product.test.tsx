import React from "react";
import { render, screen, within } from "@testing-library/react";
import Product from "./Product";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

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

describe("Render <Product />", () => {
  test("Render product with correct href and image", async () => {
    render(
      <MemoryRouter>
        <Product product={dummyProduct} />
      </MemoryRouter>
    );
    const item = await screen.findByTestId(`product ${dummyProduct._id}`);
    expect(item).toHaveAttribute("href", `/product/${dummyProduct._id}`);
    const productImage = within(item).getByTestId("product image");
    expect(productImage).toHaveAttribute("src", `${dummyProduct.image}`);
  });
});
