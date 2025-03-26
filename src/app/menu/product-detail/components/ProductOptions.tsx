"use client";
import React, { useState } from "react";

const OptionButton = ({
  name,
  disable,
}: {
  name: string;
  disable?: boolean;
}) => (
  <button
    className="font-poppins font-medium text-[16px] hover:bg-black hover:text-white transition-all ease-linear bg-[#D9D9D9] rounded-sm py-1 px-6 disabled:border-[1px] disabled:border-[#D9D9D9] disabled:bg-transparent disabled:text-[#D9D9D9]"
    disabled={disable}
  >
    {name}
  </button>
);

type Option = {
  label: string;
  options: { name: string; disable?: boolean }[];
};

const options: Option[] = [
  {
    label: "Size",
    options: [
      {
        name: "S",
      },
      {
        name: "M",
      },
      {
        name: "L",
      },
      {
        name: "XL",
        disable: true,
      },
    ],
  },
  {
    label: "Sugar",
    options: [
      { name: "30%" },
      { name: "50%" },
      { name: "70%" },
      { name: "100%" },
    ],
  },
  {
    label: "Ice",
    options: [
      { name: "30%" },
      { name: "50%" },
      { name: "70%" },
      { name: "100%" },
    ],
  },
];

const ProductOptions = () => {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="space-y-7">
      <div className="space-y-4">
        {options.map((o, index) => (
          <div key={index}>
            <p className="font-poppins font-medium text-[20px] mb-2">
              {o.label}
            </p>
            <div className="flex gap-5">
              {o.options.map((op, index) => (
                <OptionButton key={index} name={op.name} disable={op.disable} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-5">
        <div className="rounded-3xl bg-[#F4F4F4] px-4 py-2 w-fit flex gap-3 font-normal">
          <button
            className="disabled:text-[#00000080]"
            disabled={quantity < 1}
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 0)}
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              const value =
                parseInt(e.target.value) < 0 ? 0 : parseInt(e.target.value);
              setQuantity(isNaN(value) ? 0 : value);
            }}
            className="text-[16px] w-10 bg-transparent text-center"
          />
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>

        <button className="rounded-3xl bg-black text-white px-4 py-2 w-fit flex gap-3 font-normal">
          + Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductOptions;
