"use client";
import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useRouter } from "next/navigation"; // ✅ Import đúng router
import {
  ShoppingOutlined,
  AppstoreOutlined,
  TagsOutlined,
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

const SideMenu = () => {
  const router = useRouter(); // ✅ Khởi tạo router

  const items: MenuItem[] = [
    {
      key: "grp",
      label: "Management",
      type: "group",
      children: [
        {
          key: "products",
          icon: <AppstoreOutlined />,
          label: "Products",
        },
        {
          key: "categories",
          icon: <TagsOutlined />,
          label: "Categories",
        },
        {
          key: "orders",
          icon: <ShoppingOutlined />,
          label: "Orders",
        },
        {
          key: "discounts",
          icon: <TagsOutlined />,
          label: "Discounts",
        },
      ],
    },
  ];

  const onClick: MenuProps["onClick"] = ({ key }) => {
    router.push(`/admin/${key}`);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      mode="inline"
      items={items}
    />
  );
};

export default SideMenu;
