/* eslint-disable @next/next/no-img-element */
"use client";
import { useAuth } from "@/utils/context/AuthContext";
import { Dropdown, MenuProps } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const Avatar = () => {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  const truncatedFullName =
    currentUser?.fullName && currentUser?.fullName.length > 4
      ? `${currentUser?.fullName.substring(0, 4)}...`
      : currentUser?.fullName;

  const items: MenuProps["items"] = [
    {
      key: "fullName",
      label: (
        <div className="cursor-default hover:none">{currentUser?.email}</div>
      ),
    },
    ...(currentUser?.role !== "ADMIN"
      ? [
          {
            key: "profile",
            label: (
              <div
                onClick={() => router.push("/profile")}
                className="cursor-pointer"
              >
                My Profile
              </div>
            ),
          },
        ]
      : []),
    // ✅ Thêm mục Dashboard nếu là admin
    ...(currentUser?.role === "ADMIN"
      ? [
          {
            key: "dashboard",
            label: (
              <div
                onClick={() => router.push("/admin")}
                className="cursor-pointer"
              >
                Admin Dashboard
              </div>
            ),
          },
        ]
      : []),

    {
      key: "logout",
      label: (
        <div onClick={logout} className="cursor-pointer text-red-500">
          Sign out
        </div>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <div>
        <div className="h-9 w-9">
          <img
            src="/images/avatar.png"
            alt="User Avatar"
            className="object-cover"
          />
        </div>
        <span className="absolute text-black text-xs -bottom-[18px]">
          {truncatedFullName || "User"}
        </span>
      </div>
    </Dropdown>
  );
};

export default Avatar;
