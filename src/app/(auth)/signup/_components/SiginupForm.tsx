"use client";

import { Form, Input, Button, Checkbox } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

export default function SignupForm() {
  const [form] = Form.useForm();

  const onFinish = (values: unknown) => {
    console.log("Signup Data:", values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="max-w-md mx-auto py-14 px-4"
      requiredMark={"optional"}
    >
      {/* Name */}
      <Form.Item
        label="Full Name"
        name="name"
        rules={[{ required: true, message: "Please enter your full name" }]}
      >
        <Input />
      </Form.Item>

      {/* Phone Number */}
      <Form.Item
        label="Phone Number"
        name="phoneNumber"
        rules={[
          { required: true, message: "Please enter your phone number" },
          {
            pattern: /^[0-9]{10,15}$/,
            message: "Phone number must be 10-15 digits",
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* Email */}
      <Form.Item
        label="Email address"
        name="email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Email is invalid" },
        ]}
      >
        <Input />
      </Form.Item>

      {/* Password */}
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input.Password placeholder="8+ characters" />
      </Form.Item>

      {/* Confirm Password */}
      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please confirm your password" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Checkbox>
          Are you agree to Clicon{" "}
          <a href="#" target="_blank" className="text-[#2DA5F3]">
            Terms of Condition
          </a>{" "}
          and{" "}
          <a href="#" target="_blank" className="text-[#2DA5F3]">
            Privacy Policy
          </a>
          .
        </Checkbox>
      </Form.Item>

      {/* Submit Button */}
      <Button
        type="primary"
        htmlType="submit"
        block
        className="py-5 uppercase font-medium flex items-center justify-center gap-2"
      >
        Sign up <ArrowRightOutlined />
      </Button>
    </Form>
  );
}
