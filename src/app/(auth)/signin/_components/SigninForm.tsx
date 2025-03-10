"use client";

import { Form, Input, Button, message } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { htcService } from "@/utils/services/htcService";
import { toast } from "react-toastify";

// type ResponseData = {token: string}

export default function SigninForm() {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      const loginData = {
        username: values.email,
        password: values.password,
      };

      // Call the authenticateUser function from the generated API client
      const {data} = await htcService.api.authenticateUser(loginData);

      // Assuming your backend returns an object with a token field
      if (data && data.token) { 
        console.log("token: ", data.token)
        toast.success("Login successful!");
        localStorage.setItem("token", data.token);
        router.push("/"); 
      } else {
        toast.error("Login failed: Token not received");
      }
    } catch (error: any) {
      console.error("Error during login:", error);
      toast.error("Login failed!");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="max-w-md mx-auto py-14 px-4"
      requiredMark={"optional"}
    >
      {/* Email */}
      <Form.Item
        label="Email address"
        name="email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Email is invalid" },
        ]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>

      {/* Password */}
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Please enter your password" },
          { min: 8, message: "Password must be at least 8 characters" },
        ]}
      >
        <div>
          <div className="w-full flex justify-between">
            <span>Password</span>
            <Link
              href="/forgot-password"
              className="text-[#2DA5F3] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input.Password placeholder="Enter your password" />
        </div>
      </Form.Item>

      {/* Submit Button */}
      <Button
        type="primary"
        htmlType="submit"
        block
        className="py-5 uppercase font-medium flex items-center justify-center gap-2"
      >
        Sign in <ArrowRightOutlined />
      </Button>
    </Form>
  );
}
