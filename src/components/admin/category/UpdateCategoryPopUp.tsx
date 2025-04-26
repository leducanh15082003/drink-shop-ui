"use client";
import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { htcService } from "@/utils/services/htcService";
import { toast } from "react-toastify";
import { Edit } from "lucide-react";
import { CategoryDTO } from "@/utils/services/Api";

type Props = {
  fetchCategories: () => void;
  category: CategoryDTO;
};

const UpdateCategoryPopUp = ({ fetchCategories, category }: Props) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    form.setFieldsValue({
      name: category.name,
      description: category.description,
    });
  }, [category, form]);

  const onClose = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      await htcService.api.updateCategory(category.id!, {
        ...values,
      });

      toast.success("Category updated successfully");
      fetchCategories();
      onClose();
    } catch (error) {
      toast.error("Failed to update category");
      console.error(error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} icon={<Edit size={16} />} />

      <Modal
        title="Update Category"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Update"
        style={{ top: 20 }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateCategoryPopUp;
