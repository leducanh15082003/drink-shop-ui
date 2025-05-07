"use client";
import { useAuth } from "@/utils/context/AuthContext";
import { formatCurrency } from "@/utils/format/formatCurrency";
import { CartItemDTO, OrderRequest } from "@/utils/services/Api";
import { htcService } from "@/utils/services/htcService";
import { CartItem, useCartStore } from "@/utils/store/cartStore";
import { Card, Divider, Select } from "antd";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const { currentUser } = useAuth();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const { cart, discountId, clearCart, getTotalPrice } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      setPhone(currentUser?.phoneNumber || "");
    }
  }, [currentUser, router]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const paymentMethodFromQuery = queryParams.get("paymentMethod");
    if (paymentMethodFromQuery) {
      setPaymentMethod(paymentMethodFromQuery);
    }
  }, []);

  function getLoyaltyDiscount(loyaltyLevel: string) {
    if (loyaltyLevel === "LEVEL_1") return 0.1;
    if (loyaltyLevel === "LEVEL_2") return 0.2;
    return 0;
  }

  const originalPrice = getTotalPrice();
  const discount = getLoyaltyDiscount(currentUser?.loyaltyMember || "");
  const finalPrice = originalPrice - originalPrice * discount;

  const handleConfirmOrder = async () => {
    if (cart.length === 0) {
      toast.info("Cart is empty!");
      return;
    }
    if (!phone || !address) {
      toast.info("Please enter phone number and your location!");
      return;
    }
    const orderData: OrderRequest = {
      phoneNumber: phone,
      address,
      paymentMethod,
      items: cart.map<CartItemDTO>((item: CartItem) => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        size: item.size,
        sugarRate: item.sugar,
        iceRate: item.ice,
      })),
      totalPrice: finalPrice,
      discountId: discountId ? discountId : undefined,
    };
    try {
      const response = await htcService.api.checkout(orderData);
      if (response.status !== 200) {
        toast.error("Order failed!");
        return;
      }
      if (!currentUser) {
        const orderId = response.data.id;
        await htcService.api.recordGuestOrder(orderId as number);
      }
      toast.success("Order successfully!");
      clearCart();
      router.push("/profile/order");
    } catch (e) {
      console.error("Fail while ordering!", e);
      toast.error("Fail while ordering, please try again");
    }
  };

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
                <label className="text-black min-w-[100px]">Total Price</label>
                <div className="w-full px-4 py-1 border-[2px] border-[#F4F4F4] rounded-full text-black">
                  {discount > 0 ? (
                    <div className="flex flex-col text-sm">
                      <span className="line-through text-gray-400">
                        {formatCurrency(originalPrice)}
                      </span>
                      <span className="text-green-600 font-semibold">
                        {formatCurrency(finalPrice)}
                      </span>
                      <span className="text-xs text-yellow-600 italic">
                        Giảm {discount * 100}% từ{" "}
                        {currentUser?.loyaltyMember?.replace("_", " ")}
                      </span>
                    </div>
                  ) : (
                    <span>{formatCurrency(originalPrice)}</span>
                  )}
                </div>
              </div>
            </div>
            <Divider />
            <div className="my-8 space-y-4">
              <p className="text-[#6E6E6E]">General</p>
              <div className="flex gap-5 items-center">
                <label className="text-black min-w-[100px]">Phone</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  placeholder="Phone"
                  className="w-full px-4 py-1 border-[2px] border-[#F4F4F4] rounded-full text-black"
                />
              </div>
              <div className="flex gap-5 items-center">
                <label className="text-black min-w-[100px]">Main Address</label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-1 border-[2px] border-[#F4F4F4] rounded-full text-black"
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
                    Payment Information
                  </h3>
                  <p className="text-gray-600 mt-2">
                    <span className="font-medium text-gray-700">
                      Bank account:
                    </span>{" "}
                    Phan Khanh Huyen
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-700">
                      Bank name:
                    </span>{" "}
                    VietinBank
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium text-gray-700">
                      Bank number:
                    </span>{" "}
                    106873776847
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
            <button
              onClick={handleConfirmOrder}
              className="mt-4 px-4 font-semibold bg-black text-white rounded-xl py-3 w-full"
            >
              {paymentMethod === "Cash"
                ? "Confirm Order"
                : "Proceed to Payment"}
            </button>
          </div>
          <Card className="w-1/4 rounded-2xl shadow-md p-0">
            {cart.map((product) => (
              <ProductCard
                key={product.id + product.size + product.sugar + product.ice}
                product={product}
              />
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
