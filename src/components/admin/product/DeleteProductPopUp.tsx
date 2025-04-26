import React from "react";
import { Popconfirm, Button } from "antd";
import { Trash2 } from "lucide-react";
import { htcService } from "@/utils/services/htcService";
import { toast } from "react-toastify";

interface Props {
  productId: number;
  fetchProducts: () => void;
}

const DeleteProductPopUp: React.FC<Props> = ({ productId, fetchProducts }) => {
  const confirmDelete = async () => {
    try {
      const response = await htcService.api.deleteProduct(productId);
      if (response.status == 204) {
        toast.success("Delete product successfully!");
        fetchProducts();
      } else {
        toast.error("Delete product failed!");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Delete product failed!");
    }
  };

  return (
    <Popconfirm
      title="Delete Product"
      description="Are you sure to delete this product?"
      onConfirm={confirmDelete}
      okText="Delete"
      cancelText="Cancel"
    >
      <Button danger icon={<Trash2 size={16} />} />
    </Popconfirm>
  );
};

export default DeleteProductPopUp;
