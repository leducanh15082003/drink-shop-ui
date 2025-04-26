import React from "react";
import { Popconfirm, Button } from "antd";
import { Trash2 } from "lucide-react";
import { htcService } from "@/utils/services/htcService";
import { toast } from "react-toastify";

interface Props {
  categoryId: number;
  fetchCategories: () => void;
}

const DeleteCategory: React.FC<Props> = ({ categoryId, fetchCategories }) => {
  const confirmDelete = async () => {
    try {
      const response = await htcService.api.deleteCategory(categoryId);
      if (response.status == 204) {
        toast.success("Delete category successfully!");
        fetchCategories();
      } else {
        toast.error("Delete category failed!");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Delete category failed!");
    }
  };

  return (
    <Popconfirm
      title="Delete category"
      description="Are you sure to delete this category?"
      onConfirm={confirmDelete}
      okText="Delete"
      cancelText="Cancel"
    >
      <Button danger icon={<Trash2 size={16} />} />
    </Popconfirm>
  );
};

export default DeleteCategory;
