import React from "react";
import { Popconfirm, Button } from "antd";
import { Trash2 } from "lucide-react";
import { htcService } from "@/utils/services/htcService";
import { toast } from "react-toastify";

interface Props {
  discountId: number;
  fetchDiscounts: () => void;
}

const DeleteDiscount: React.FC<Props> = ({ discountId, fetchDiscounts }) => {
  const confirmDelete = async () => {
    try {
      const response = await htcService.api.deleteDiscount(discountId);
      if (response.status == 204) {
        toast.success("Delete discount successfully!");
        fetchDiscounts();
      } else {
        toast.error("Delete discount failed!");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Delete discount failed!");
    }
  };

  return (
    <Popconfirm
      title="Delete discount"
      description="Are you sure to delete this discount?"
      onConfirm={confirmDelete}
      okText="Delete"
      cancelText="Cancel"
    >
      <Button danger icon={<Trash2 size={16} />} />
    </Popconfirm>
  );
};

export default DeleteDiscount;
