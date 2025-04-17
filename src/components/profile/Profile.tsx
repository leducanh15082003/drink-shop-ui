/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Input, Upload, Form } from "antd";
import { UploadOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { htcService } from "@/utils/services/htcService";
import { toast } from "react-toastify";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>(
    "https://i.pravatar.cc/150"
  );
  const [form] = Form.useForm();

  // fake user data
  const [user, setUser] = useState({
    id: 1,
    fullName: "Nguyen Van A",
    phoneNumber: "0123456789",
    email: "user@example.com",
  });

  const fetchUser = async () => {
    try {
      const response = await htcService.api.getCurrentUser();
      const data = response.data;
      setUser(data);
      form.setFieldsValue({
        fullName: response.data.fullName,
        phoneNumber: response.data.phoneNumber,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleAvatarChange = (info: any) => {
    if (info.file.status === "done") {
      // giả lập upload xong và lấy base64 preview
      const reader = new FileReader();
      reader.readAsDataURL(info.file.originFileObj);
      reader.onload = () => {
        setAvatarUrl(reader.result as string);
        toast.success("Avatar updated!");
      };
    }
  };

  const onFinish = async (values: any) => {
    try {
      const response = await htcService.api.updateUser(user.id, values);
      if (response.status === 200) {
        setIsEditing(false);
        toast.success("Profile updated successfully!");
        fetchUser();
      } else {
        toast.error("Update profile failed!");
      }
    } catch (error) {
      toast.error("Update profile failed!");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      {/* Avatar */}
      <div className="flex flex-col items-center">
        <Avatar size={96} src={avatarUrl} />
        <Upload
          showUploadList={false}
          maxCount={1}
          beforeUpload={() => false} // Ngăn không upload lên server
          onChange={handleAvatarChange}
        >
          <Button size="small" className="mt-2" icon={<UploadOutlined />}>
            Change Avatar
          </Button>
        </Upload>
      </div>

      {/* Info Form */}
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Full Name" name="fullName">
          {isEditing ? (
            <Input />
          ) : (
            <div className="text-base font-medium">{user.fullName}</div>
          )}
        </Form.Item>

        <Form.Item label="Phone Number" name="phoneNumber">
          {isEditing ? (
            <Input />
          ) : (
            <div className="text-base font-medium">{user.phoneNumber}</div>
          )}
        </Form.Item>

        <Form.Item label="Email">
          <div className="text-base font-medium text-gray-500">
            {user.email}
          </div>
        </Form.Item>
      </Form>
      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        {isEditing ? (
          <Button
            type="primary"
            onClick={() => form.submit()}
            icon={<SaveOutlined />}
          >
            Save
          </Button>
        ) : (
          <Button
            htmlType="button"
            icon={<EditOutlined />}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default Profile;
