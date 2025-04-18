"use client";
import { useCartStore } from "@/utils/store/cartStore";
import React from "react";
import { useForm } from "react-hook-form";
import QuantityButton from "./QuantityButton";

const sizeIncrements = {
  S: 0,
  M: 5000,
  L: 10000,
  XL: 15000,
};

const options = [
  {
    label: "Size",
    name: "size",
    options: Object.keys(sizeIncrements).map((size) => ({ name: size })),
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

const ProductOptions = ({
  productId,
  productName,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  image,
  basePrice,
  category,
  onClose,
}: {
  productId: number;
  productName: string;
  image: string;
  basePrice: number;
  category: string;
  onClose?: () => void;
}) => {
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
  const price =
    (basePrice + sizeIncrements[selectedSize as keyof typeof sizeIncrements]) *
    quantity;

  const isDrink = category === "tea" || category === "coffee";

  const handleAddToCart = () => {
    addToCart({
      id: productId,
      image: "/images/menu/FriedEggs.png",
      // image: image,
      name: productName,
      price:
        basePrice + sizeIncrements[selectedSize as keyof typeof sizeIncrements],
      quantity: quantity,
      size: selectedSize as string,
      sugar: watch("sugar"),
      ice: watch("ice"),
    });

    if (onClose) {
      onClose();
    }
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
                  className={`py-1 px-6 rounded-sm transition-all 
                    ${watch(o.name as "size" | "sugar" | "ice" | "quantity") === op.name ? "bg-black text-white" : "bg-gray-300"}
                    ${!isDrink ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() =>
                    isDrink &&
                    setValue(
                      o.name as "size" | "sugar" | "ice" | "quantity",
                      op.name
                    )
                  }
                  disabled={!isDrink}
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
