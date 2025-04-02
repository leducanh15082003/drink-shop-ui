"use client";
import { useCartStore } from "@/utils/store/cartStore";
import React from "react";
import { useForm } from "react-hook-form";
import QuantityButton from "./QuantityButton";

const sizePrices = {
  S: 50000,
  M: 55000,
  L: 60000,
  XL: 65000,
};

const options = [
  {
    label: "Size",
    name: "size",
    options: Object.keys(sizePrices).map((size) => ({ name: size })),
  },
  {
    label: "Sugar",
    name: "sugar",
    options: [
      { name: "30%" },
      { name: "50%" },
      { name: "70%" },
      { name: "100%" },
    ],
  },
  {
    label: "Ice",
    name: "ice",
    options: [
      { name: "30%" },
      { name: "50%" },
      { name: "70%" },
      { name: "100%" },
    ],
  },
];

const ProductOptions = ({ productId }: { productId: number }) => {
  const { watch, setValue } = useForm({
    defaultValues: {
      size: "S",
      sugar: "100%",
      ice: "100%",
      quantity: 1,
    },
  });

  const { addToCart, cart } = useCartStore();

  const selectedSize = watch("size");
  const quantity = watch("quantity");
  const price = sizePrices[selectedSize as keyof typeof sizePrices] * quantity;

  const handleAddToCart = () => {
    addToCart({
      id: productId,
      image: "/images/menu/FriedEggs.png",
      name: "Fried Eggs",
      price: sizePrices[selectedSize as keyof typeof sizePrices],
      quantity: quantity,
      size: selectedSize as string,
      sugar: watch("sugar"),
      ice: watch("ice"),
    });
  };

  console.log(cart);

  return (
    <div className="space-y-7">
      <div className="space-y-4">
        {options.map((o) => (
          <div key={o.name}>
            <p className="font-medium text-[20px] mb-2">{o.label}</p>
            <div className="flex gap-5">
              {o.options.map((op) => (
                <button
                  key={op.name}
                  type="button"
                  className={`py-1 px-6 rounded-sm transition-all ${watch(o.name as "size" | "sugar" | "ice" | "quantity") === op.name ? "bg-black text-white" : "bg-gray-300"}`}
                  onClick={() =>
                    setValue(
                      o.name as "size" | "sugar" | "ice" | "quantity",
                      op.name
                    )
                  }
                >
                  {op.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-5 items-center">
        <QuantityButton
          onChange={(value) => setValue("quantity", value)}
          value={quantity}
        />
        <button
          onClick={handleAddToCart}
          className="bg-black text-white px-4 py-2 rounded-xl"
        >
          + Add to cart ({price.toLocaleString()}đ)
        </button>
      </div>
    </div>
  );
};

export default ProductOptions;
