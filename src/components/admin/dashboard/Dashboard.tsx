/* eslint-disable @next/next/no-img-element */
"use client";
import { Card, Button, Table } from "antd";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FilterOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { htcService } from "@/utils/services/htcService";

interface Stat {
  label: string;
  value: number | string;
  change: string;
  positive: boolean;
}

const revenueData = [
  { name: "Jan", value: 55 },
  { name: "Feb", value: 65 },
  { name: "Mar", value: 78 },
  { name: "Apr", value: 60 },
  { name: "May", value: 42 },
  { name: "Jun", value: 58 },
  { name: "Jul", value: 66 },
  { name: "Aug", value: 77 },
  { name: "Sep", value: 64 },
  { name: "Oct", value: 52 },
  { name: "Nov", value: 47 },
  { name: "Dec", value: 70 },
];

const productData = [
  {
    key: "1",
    name: "Matcha Latte",
    description: "Description",
    category: "Tea",
    price: "50,000đ",
    image: "/images/matcha.jpg",
  },
  {
    key: "2",
    name: "Espresso",
    description: "Description",
    category: "Coffee",
    price: "50,000đ",
    image: "/images/matcha.jpg",
  },
  {
    key: "3",
    name: "Croissant",
    description: "Description",
    category: "Pastry",
    price: "50,000đ",
    image: "/images/matcha.jpg",
  },
];

const columns = [
  {
    title: "Product Name",
    dataIndex: "name",
    key: "name",
    render: (_: any, record: any) => (
      <div className="flex items-center gap-2">
        <img src={record.image} className="w-6 h-6 rounded-full" alt="" />
        {record.name}
      </div>
    ),
  },
  { title: "Description", dataIndex: "description", key: "description" },
  { title: "Category", dataIndex: "category", key: "category" },
  { title: "Price", dataIndex: "price", key: "price" },
];

export default function Dashboard() {
  const [orderStat, setOrderStat] = useState<Stat | null>(null);
  useEffect(() => {
    const fetchOrderStat = async () => {
      try {
        const response = await htcService.api.getTotalOrders();
        const data = response.data as {
          label?: string;
          value?: number | string;
          change?: string;
          positive?: boolean;
        };
        const stat: Stat = {
          label: data.label ?? "Total Orders",
          value: data.value ?? 0,
          change: data.change ?? "0%",
          positive: data.positive ?? false,
        };
        setOrderStat(stat);
      } catch (err) {
        console.error("Failed to fetch order stat", err);
      }
    };
    fetchOrderStat();
  }, []);
  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card bordered>
          <>
            <p className="text-gray-500 text-sm">{orderStat?.label}</p>
            <p className="text-xl font-bold">{orderStat?.value}</p>
            <p
              className={`text-sm ${orderStat?.positive ? "text-green-600" : "text-red-600"}`}
            >
              {orderStat?.change}
            </p>
          </>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card title="Revenue" extra={<Button> This Month </Button>}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="value" fill="#c0392b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Top-selling Products Table */}
      <Card
        title="Top-selling Products"
        extra={
          <Button icon={<FilterOutlined />} size="small">
            Filter & Sort
          </Button>
        }
      >
        <Table columns={columns} dataSource={productData} pagination={false} />
      </Card>
    </div>
  );
}
