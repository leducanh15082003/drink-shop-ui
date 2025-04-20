"use client";
import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { htcService } from "@/utils/services/htcService";
import { CategoryDTO, ProductDTO } from "@/utils/services/Api";
import TextArea from "antd/es/input/TextArea";
import { toast } from "react-toastify";
import { supabase } from "@/utils/lib/supabase";

export default function ProductTable() {
  const [products, setProducts] = useState<ProductDTO[]>();
  const [categories, setCategories] = useState<CategoryDTO[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [lastUploadedPath, setLastUploadedPath] = useState<string | null>(null);
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

  const handleCancel = async () => {
    if (lastUploadedPath) {
      await supabase.storage.from("drinkshop").remove([lastUploadedPath]);
      setLastUploadedPath(null);
    }

    setImagePreview(null);
    form.resetFields();
    setIsModalOpen(false);
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

          <Form.Item label="Product Image">
            <div style={{ textAlign: "center" }}>
              <Upload
                showUploadList={false}
                beforeUpload={async (file) => {
                  if (lastUploadedPath) {
                    await supabase.storage
                      .from("drinkshop")
                      .remove([lastUploadedPath]);
                    setLastUploadedPath(null);
                  }

                  const { data, error } = await supabase.storage
                    .from("drinkshop")
                    .upload(`temp/${Date.now()}-${file.name}`, file);

                  if (error) {
                    toast.error("Upload failed!");
                    return Upload.LIST_IGNORE;
                  }

                  const url = supabase.storage
                    .from("drinkshop")
                    .getPublicUrl(data.path).data.publicUrl;

                  form.setFieldsValue({ image: url });
                  setImagePreview(url); // state dùng để hiển thị ảnh preview
                  setLastUploadedPath(data.path); // Lưu lại path mới

                  return false; // không upload bằng antd, mình tự handle
                }}
              >
                <div
                  style={{
                    width: 150,
                    height: 150,
                    border: "1px dashed #d9d9d9",
                    borderRadius: 8,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  ) : (
                    <span>Click to Upload</span>
                  )}
                </div>
              </Upload>
            </div>
          </Form.Item>

          <Form.Item name="image" noStyle rules={[{ required: true }]}>
            <Input type="hidden" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
