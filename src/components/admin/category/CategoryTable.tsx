"use client";
import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { htcService } from "@/utils/services/htcService";
import { CategoryDTO } from "@/utils/services/Api";
import { toast } from "react-toastify";
import UpdateCategoryPopUp from "./UpdateCategoryPopUp";
import DeleteCategory from "./DeleteCategory";

export default function CategoryTable() {
  const [categories, setCategories] = useState<CategoryDTO[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    htcService.api.getAllCategories().then((res) => {
      setCategories(res.data);
    });
  };

  const columns: ColumnsType<CategoryDTO> = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <UpdateCategoryPopUp
            category={record}
            fetchCategories={fetchCategories}
          />
          <DeleteCategory
            categoryId={record.id!}
            fetchCategories={fetchCategories}
          />
        </div>
      ),
    },
  ];

  const showModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      htcService.api
        .createCategory({
          description: values.description,
          name: values.name,
        })
        .then((res) => {
          if (res.status == 200) {
            fetchCategories();
            toast.success("Category added successfully!");
          }
        });
      setIsModalOpen(false);
    });
  };

  const handleCancel = async () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Category List</h2>
        <Button type="primary" onClick={showModal}>
          Add Category
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={categories}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Add New Category"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Add"
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
    </div>
  );
}
