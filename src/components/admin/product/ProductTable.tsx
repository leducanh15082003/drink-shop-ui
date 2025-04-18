"use client";
import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { htcService } from "@/utils/services/htcService";
import { CategoryDTO, ProductDTO } from "@/utils/services/Api";
import TextArea from "antd/es/input/TextArea";
import { toast } from "react-toastify";

export default function ProductTable() {
  const [products, setProducts] = useState<ProductDTO[]>();
  const [categories, setCategories] = useState<CategoryDTO[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProducts();
    htcService.api.getAllCategories().then((res) => {
      setCategories(res.data);
    });
  }, []);

  const fetchProducts = () => {
    htcService.api.getAllProducts().then((res) => {
      setProducts(res.data);
    });
  };

  const columns: ColumnsType<ProductDTO> = [
    {
      title: "Image",
      dataIndex: "image",
      render: (url) => (
        <img
          src={url}
          alt="product"
          className="w-12 h-12 object-cover rounded"
        />
      ),
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
      title: "Price",
      dataIndex: "price",
      render: (price) => `${price} $`,
    },
    {
      title: "Category",
      dataIndex: "category",
    },
  ];

  const showModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      htcService.api
        .createProduct({
          name: values.name,
          description: values.description,
          price: values.price,
          categoryId: values.category,
          image: values.image,
          ingredients: values.ingredients,
        })
        .then((res) => {
          if (res.status == 200) {
            fetchProducts();
            toast.success("Product added successfully!");
          }
        });
      setIsModalOpen(false);
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Product List</h2>
        <Button type="primary" onClick={showModal}>
          Add Product
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Add New Product"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
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

          <Form.Item name="ingredients" label="Ingredients">
            <TextArea />
          </Form.Item>

          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber min={0} step={0.1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select category">
              {categories?.map((cat) => (
                <Select.Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true }]}
          >
            <Input placeholder="/images/menu/image.png" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
