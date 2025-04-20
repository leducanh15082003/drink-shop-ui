import { useCartStore } from "@/utils/store/cartStore";
import { Badge } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const CartIconSvg = () => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="cursor-pointer"
  >
    <path
      d="M7.8125 7.98953V6.97911C7.8125 4.63536 9.69792 2.33328 12.0417 2.11453C14.8333 1.8437 17.1875 4.04161 17.1875 6.7812V8.2187"
      stroke="black"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.37494 22.9167H15.6249C19.8124 22.9167 20.5624 21.2396 20.7812 19.198L21.5624 12.948C21.8437 10.4063 21.1145 8.33337 16.6666 8.33337H8.33327C3.88536 8.33337 3.15619 10.4063 3.43744 12.948L4.21869 19.198C4.43744 21.2396 5.18744 22.9167 9.37494 22.9167Z"
      stroke="black"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.1411 12.5H16.1504"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.84836 12.5H8.85772"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CartIcon = () => {
  const { cart } = useCartStore();
  const router = useRouter();
  return (
    <Badge
      onClick={() => router.push("/cart")}
      count={cart.length}
      size="small"
    >
      <CartIconSvg />
    </Badge>
  );
};

export default CartIcon;
