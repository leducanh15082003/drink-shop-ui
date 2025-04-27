"use client";
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import dayjs from "dayjs";
import { htcService } from "@/utils/services/htcService";
import { Discount } from "@/utils/services/Api";
import { formatCurrency } from "@/utils/format/formatCurrency";
import { useCartStore } from "@/utils/store/cartStore";

const VoucherDropdown = ({ totalPrice }: { totalPrice: number }) => {
  const [vouchers, setVouchers] = useState<Discount[]>([]);
  const { applyDiscount } = useCartStore();

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      const response = await htcService.api.getAllActiveDiscounts();
      setVouchers(response.data);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    }
  };

  const handleSelect = (value: string) => {
    const selectedVoucher = vouchers.find(
      (voucher) => voucher.id?.toString() == value
    );

    console.log("Selected voucher:", selectedVoucher, value);
    if (selectedVoucher) {
      const discountAmount =
        selectedVoucher.discountAmountType === "PERCENTAGE"
          ? (totalPrice * selectedVoucher.amount!) / 100
          : selectedVoucher.amount!;

      applyDiscount(selectedVoucher.id!, discountAmount);
    }
  };

  return (
    <Select
      placeholder="Select a voucher"
      style={{ width: "100%" }}
      onChange={handleSelect}
      optionLabelProp="label"
      allowClear
      onClear={() => applyDiscount(0, 0)}
    >
      {vouchers.map((voucher) => {
        const quantityColor =
          voucher.quantity! > 5 ? "text-green-500" : "text-red-500";
        const amountDisplay =
          voucher.discountAmountType === "PERCENTAGE"
            ? `${voucher.amount}%`
            : `${formatCurrency(voucher.amount!)}`;

        return (
          <Select.Option
            key={voucher.id}
            value={voucher.id}
            label={voucher.code}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-semibold text-base">{voucher.code}</div>
                {voucher.description && (
                  <div className="text-sm text-gray-500">
                    {voucher.description}
                  </div>
                )}
                <div className="text-xs text-gray-400 mt-1">
                  {dayjs(voucher.startDate).format("DD/MM/YYYY")} -{" "}
                  {dayjs(voucher.endDate).format("DD/MM/YYYY")}
                </div>
                <div className={`text-xs mt-1 ${quantityColor}`}>
                  Quantity: {voucher.quantity}
                </div>
              </div>
              <div className="text-right font-bold text-lg">
                {amountDisplay}
              </div>
            </div>
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default VoucherDropdown;
