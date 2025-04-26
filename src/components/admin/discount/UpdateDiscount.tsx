"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  InputNumber,
  Radio,
  Row,
  Col,
  Select,
} from "antd";
import { htcService } from "@/utils/services/htcService";
import { toast } from "react-toastify";
import { Edit } from "lucide-react";

type Props = {
  discountId: number;
  fetchDiscounts: () => void;
};

const UpdateDiscount = ({ discountId, fetchDiscounts }: Props) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (discountId && isModalOpen) {
      htcService.api.getDiscountById(discountId).then((res) => {
        form.setFieldsValue({
          code: res.data.code,
          discountAmountType: res.data.discountAmountType,
          amount: res.data.amount,
          startDate: res.data.startDate,
          endDate: res.data.endDate,
          quantity: res.data.quantity,
          minimumOrderPrice: res.data.minimumOrderPrice,
          isActive: res.data.isActive,
          description: res.data.description,
        });
      });
    }
  }, [discountId, form, isModalOpen]);

  const onClose = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const response = await htcService.api.updateDiscount(discountId, {
        ...values,
      });

      if (response.status !== 200) {
        toast.error("Failed to update discount");
        return;
      }

      toast.success("Discount updated successfully");
      fetchDiscounts();
      onClose();
    } catch (error) {
      toast.error("Failed to update discount");
      console.error(error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <>
      <Button
        type="text"
        onClick={() => setIsModalOpen(true)}
        icon={<Edit size={16} />}
      />

      <Modal
        title="Update Discount"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Update"
        style={{ top: 20 }}
        width={800} // chỉnh rộng modal ra cho dễ bố cục 2 cột
      >
        <Form form={form} layout="vertical" name="discountForm">
          <Row gutter={24}>
            {/* Cột bên trái */}
            <Col span={12}>
              <Form.Item
                name="code"
                label="Code"
                rules={[
                  { required: true, message: "Please input discount code" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Discount Amount" required>
                <Row gutter={8}>
                  <Col span={10}>
                    <Form.Item
                      name="discountAmountType"
                      noStyle
                      rules={[
                        { required: true, message: "Select discount type" },
                      ]}
                    >
                      <Select
                        placeholder="Select type"
                        options={[
                          { value: "PERCENTAGE", label: "%" },
                          { value: "FIXED", label: "VND" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={14}>
                    <Form.Item
                      name="amount"
                      noStyle
                      rules={[
                        { required: true, message: "Enter amount" },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              getFieldValue("discountAmountType") ===
                              "PERCENTAGE"
                            ) {
                              if (value > 0 && value <= 100) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error(
                                  "Percentage must be between 0 and 100"
                                )
                              );
                            }
                            if (value > 0) return Promise.resolve();
                            return Promise.reject(
                              new Error("Amount must be positive")
                            );
                          },
                        }),
                      ]}
                    >
                      <InputNumber
                        style={{ width: "100%" }}
                        min={0}
                        step={0.01}
                        placeholder="Enter amount"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[
                  { required: true, message: "Please select start date" },
                ]}
              >
                <Input type="datetime-local" />
              </Form.Item>

              <Form.Item
                name="endDate"
                label="End Date"
                rules={[{ required: true, message: "Please select end date" }]}
              >
                <Input type="datetime-local" />
              </Form.Item>
            </Col>

            {/* Cột bên phải */}
            <Col span={12}>
              <Form.Item
                name="quantity"
                label="Quantity"
                rules={[
                  { required: true, message: "Please input quantity" },
                  {
                    type: "number",
                    min: 1,
                    message: "Quantity must be at least 1",
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} min={1} />
              </Form.Item>

              <Form.Item
                name="minimumOrderPrice"
                label="Minimum Order Price"
                rules={[
                  {
                    required: true,
                    message: "Please input minimum order price",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Must be zero or positive",
                  },
                ]}
                initialValue={0}
              >
                <InputNumber style={{ width: "100%" }} min={0} step={0.01} />
              </Form.Item>

              <Form.Item
                name="isActive"
                label="Status"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Radio.Group>
                  <Radio value={true}>Active</Radio>
                  <Radio value={false}>Inactive</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item name="description" label="Description">
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateDiscount;
