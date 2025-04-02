"use client";
import { CartItem, useCartStore } from "@/utils/store/cartStore";
import { Card, Divider, Select } from "antd";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import React, { useState } from "react";

const CheckoutPage = () => {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const { cart } = useCartStore();

  return (
    <div className="bg-white p-16">
      <div>
        <div className="flex justify-between w-full">
          <Title level={1}>Checkout Details</Title>
          <span className="text-[#6E6E6E]">
            Free delivery and free returns.
          </span>
        </div>
        <span className="text-[#8A8B8D]">
          Enter your personal details to complete your purchase.
        </span>
        <div className="flex gap-4">
          <div className="w-3/4">
            <div className="my-8 space-y-4">
              <p className="text-[#6E6E6E]">General</p>
              <div className="flex gap-5 items-center">
                <label className="text-black min-w-[100px]">Phone</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  placeholder="Phone"
                  className="w-full px-4 py-1 border-[2px] border-[#F4F4F4] rounded-full"
                />
              </div>
              <div className="flex gap-5 items-center">
                <label className="text-black min-w-[100px]">Main Address</label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-1 border-[2px] border-[#F4F4F4] rounded-full"
                />
              </div>
            </div>
            <Divider />
            <div className="my-8 space-y-4">
              <p className="text-[#6E6E6E]">Payment Methods</p>
              <div className="flex gap-5 items-center">
                <label className="text-black min-w-[100px]">Method</label>
                <Select
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                  className="w-full"
                >
                  <Select.Option value="Cash">Cash</Select.Option>
                  <Select.Option value="Banking">Banking</Select.Option>
                </Select>
              </div>
            </div>
            {paymentMethod === "Banking" && (
              <div className="flex gap-6 p-6 border rounded-xl bg-gray-50 shadow-md">
                {/* Cột 1: Thông tin tài khoản */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Thông tin thanh toán
                  </h3>
                  <p className="text-gray-600 mt-2">
                    <span className="font-medium text-gray-700">
                      Chủ tài khoản:
                    </span>{" "}
                    Nguyen Quang Tu
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-700">
                      Ngân hàng:
                    </span>{" "}
                    MB Bank
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-700">
                      Số tài khoản:
                    </span>{" "}
                    0965037791
                  </p>
                </div>

                {/* Cột 2: QR Code */}
                <div className="flex flex-1 flex-col items-center">
                  <Image
                    src="/images/qr-code.png"
                    width={180}
                    height={180}
                    alt="QR Code"
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            )}
            <button className="mt-4 px-4 font-semibold bg-black text-white rounded-xl py-3 w-full">
              {paymentMethod === "Cash"
                ? "Confirm Order"
                : "Proceed to Payment"}
            </button>
          </div>
          <Card className="w-1/4 rounded-2xl shadow-md p-0">
            {cart.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product }: { product: CartItem }) => {
  return (
    <div className="mb-4">
      <Image
        className="w-full rounded-2xl"
        src={product.image}
        width={100}
        height={100}
        alt=""
      />
      <Title className="my-2" level={3}>
        {product.name} ({product.size})
      </Title>
      <span className="font-poppins text-black text-xs font-medium">
        x{product.quantity} - {product.sugar} Sugar - {product.ice} Ice
      </span>
      <Divider className="my-1" />
    </div>
  );
};

export default CheckoutPage;
