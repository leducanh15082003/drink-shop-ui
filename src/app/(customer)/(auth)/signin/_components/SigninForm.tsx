"use client";

import { Form, Input, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { htcService } from "@/utils/services/htcService";
import { toast } from "react-toastify";
import { useAuth } from "@/utils/context/AuthContext";

interface LoginResponse {
  token: string;
  fullName: string;
  role: string;
}
export default function SigninForm() {
  const [form] = Form.useForm();
  const router = useRouter();
  const { login } = useAuth();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const loginData = {
        email: values.email,
        password: values.password,
      };

      // Call the authenticateUser function from the generated API client
      const response = await htcService.api.authenticateUser(loginData);
      const data = response.data as LoginResponse;

      // Assuming your backend returns an object with a token field
      if (data && data.token) {
        console.log("token: ", data.token);
        console.log("fullName: ", data.fullName);
        toast.success("Login successful!");
        login(data.token);
        window.dispatchEvent(new Event("storage"));
        if (data.role == "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        toast.error("Login failed: Token not received");
      }
    } catch (error) {
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
