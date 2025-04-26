"use client";
import React, { useEffect, useState } from "react";
import { Modal, Form, Input, InputNumber, Select, Upload, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { htcService } from "@/utils/services/htcService";
import { toast } from "react-toastify";
import { Edit } from "lucide-react";
import { supabase } from "@/utils/lib/supabase";
import { CategoryDTO } from "@/utils/services/Api";

type Props = {
  productId: number;
  fetchProducts: () => void;
  categories: CategoryDTO[];
};

const UpdateProductPopUp = ({
  productId,
  fetchProducts,
  categories,
}: Props) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [lastUploadedPath, setLastUploadedPath] = useState<string | null>(null);

  useEffect(() => {
    if (productId && isModalOpen) {
      htcService.api.getProductById(productId).then((res) => {
        form.setFieldsValue({
          name: res.data.name,
          description: res.data.description,
          ingredients: res.data.ingredients,
          price: res.data.price,
          category: res.data.categoryId,
          image: res.data.image,
        });
        setImagePreview(res.data.image!);
      });
    }
  }, [productId, isModalOpen, form]);

  const onClose = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      await htcService.api.updateProduct(productId, {
        ...values,
        categoryId: values.category,
      });

      toast.success("Product updated successfully");
      fetchProducts();
      onClose();
    } catch (error) {
      toast.error("Failed to update product");
      console.error(error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setImagePreview(null);
    onClose();
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} icon={<Edit size={16} />} />

      <Modal
        title="Update Product"
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
                  setImagePreview(url);
                  setLastUploadedPath(data.path);

                  return false;
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
    </>
  );
};

export default UpdateProductPopUp;
