/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Card, Button, Table, Spin } from "antd";
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

interface MonthlyRevenue {
  month: string;
  value: number;
}

interface ProductData {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  ingredients: string;
  category: string;
  categoryId: number;
}

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
  const [revenueStat, setRevenueStat] = useState<Stat | null>(null);
  const [totalProducts, setTotalProducts] = useState<number | null>(null);
  const [visitStat, setVisitStat] = useState<Stat | null>(null);
  const [revenueData, setRevenueData] = useState<MonthlyRevenue[]>([]);
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          orderRes,
          revenueRes,
          productRes,
          visitRes,
          revenueEachMonthRes,
          topSoldRes,
        ] = await Promise.all([
          htcService.api.getTotalOrders(),
          htcService.api.getMonthlyRevenue(),
          htcService.api.getTotalProductsStat(),
          htcService.api.getVisits(),
          htcService.api.getRevenueDataEachMonth(),
          htcService.api.getTopSoldProducts(),
        ]);

        // Map DTO → Stat với default
        const mapToStat = (dto: any, fallbackLabel: string): Stat => ({
          label: dto.label ?? fallbackLabel,
          value: dto.value ?? 0,
          change: dto.change ?? "0%",
          positive: dto.positive ?? false,
        });

        setOrderStat(mapToStat(orderRes.data, "Completed Orders"));
        setRevenueStat(mapToStat(revenueRes.data, "Revenue"));

        const prodDto = productRes.data as { value?: number };
        const total = prodDto.value ?? 0;
        setTotalProducts(total);
        setVisitStat(mapToStat(visitRes.data, "Website Visit Counts"));
        setRevenueData(revenueEachMonthRes.data as MonthlyRevenue[]);
        setProductData(topSoldRes.data as ProductData[]);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

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

        <Card bordered>
          <p className="text-gray-500 text-sm">{revenueStat?.label}</p>
          <p className="text-xl font-bold">{revenueStat?.value}</p>
          <p
            className={`text-sm ${
              revenueStat?.positive ? "text-green-600" : "text-red-600"
            }`}
          >
            {revenueStat?.change}
          </p>
        </Card>

        <Card bordered>
          <p className="text-gray-500 text-sm">Total Products</p>
          <p className="text-xl font-bold">{totalProducts}</p>
        </Card>
        <Card bordered>
          <p className="text-gray-500 text-sm">{visitStat?.label}</p>
          <p className="text-xl font-bold">{visitStat?.value}</p>
          <p
            className={`text-sm ${visitStat?.positive ? "text-green-600" : "text-red-600"}`}
          >
            {visitStat?.change}
          </p>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card title="Revenue" extra={<Button> This Year </Button>}>
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
