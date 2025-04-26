import { htcService } from "@/utils/services/htcService";
import { Switch } from "antd";
import React from "react";
import { toast } from "react-toastify";

const ActiveSwitch = ({
  id,
  active,
  fetchDiscounts,
}: {
  id: number;
  active: boolean;
  fetchDiscounts: () => void;
}) => {
  const handleChange = async (checked: boolean) => {
    try {
      const response = await htcService.api.updateDiscountStatus(id, checked);
      if (response.status === 200) {
        toast.success("Discount status updated successfully");
        fetchDiscounts();
      } else {
        toast.error("Failed to update discount status");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update discount status");
    }
  };

  return (
    <Switch
      style={{
        backgroundColor: active ? "#52c41a" : "#f5222d",
      }}
      checkedChildren="Active"
      unCheckedChildren="Inactive"
      defaultChecked={active}
      onChange={handleChange}
    />
  );
};

export default ActiveSwitch;
