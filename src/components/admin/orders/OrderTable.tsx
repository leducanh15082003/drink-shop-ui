"use client";
import { formatCurrency } from "@/utils/format/formatCurrency";
import { OrderDTO } from "@/utils/services/Api";
import { htcService } from "@/utils/services/htcService";
import { Table, Tag, Drawer, Select, Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const { Option } = Select;

const orderStatusColors: Record<string, string> = {
  PENDING: "orange",
  PROCESSING: "blue",
  COMPLETED: "green",
};

const paymentStatusColors: Record<string, string> = {
  UNPAID: "volcano",
  PAID: "green",
};

const OrderTable = () => {
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderDTO | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await htcService.api.getAllOrders();
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const changeOrderStatus = async (
    orderId: number,
    newStatus: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED"
  ) => {
    try {
      const response = await htcService.api.updateOrderStatus(
        orderId,
        newStatus
      );
      if (response.status === 200) {
        fetchOrders();
        toast.success("Order status changed successfully!");
      } else {
        toast.error("Change order status failed!");
      }
    } catch (error) {
      console.error("Error changing order status:", error);
    }
  };

  const showDrawer = (order: OrderDTO) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const columns: ColumnsType<OrderDTO> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Order time",
      dataIndex: "orderTime",
      key: "orderTime",
      render: (time: string) => new Date(time).toLocaleString(),
    },
    {
      title: "User",
      dataIndex: "userName",
      render: (name: string) => name || "Anonymous",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, record) => (
        <div className="flex gap-2">
          <span className={record.discountAmDouble ? "line-through" : ""}>
            {formatCurrency(record.price!)}
          </span>
          {record.discountAmDouble && (
            <span className="text-green-500">
              {formatCurrency(record.price! - record.discountAmDouble)}
            </span>
          )}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (
        status: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED",
        record
      ) => (
        <Select
          value={status}
          onChange={(newStatus) => changeOrderStatus(record.id!, newStatus)}
          style={{ width: 120 }}
          disabled={status === "COMPLETED" || status === "CANCELLED"}
        >
          {Object.keys(orderStatusColors).map((status) => (
            <Option value={status} key={status}>
              <Tag color={orderStatusColors[status]}>{status}</Tag>
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
      render: (payment) => (
        <Tag color={paymentStatusColors[payment.status]}>
          {payment.status} - {payment.paymentMethod}
        </Tag>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => showDrawer(record)}>
          <Eye />
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Order List</h2>
      </div>
      <Table columns={columns} dataSource={orders} rowKey={"id"} />
      <Drawer
        title={`Chi tiết đơn hàng #${selectedOrder?.id}`}
        onClose={closeDrawer}
        open={open}
        width={500}
      >
        {selectedOrder && (
          <>
            <p>
              <b>Khách hàng:</b> User #{selectedOrder.userId}
            </p>
            <p>
              <b>SĐT:</b> {selectedOrder.phoneNumber}
            </p>
            <p>
              <b>Địa chỉ:</b> {selectedOrder.address}
            </p>
            <p>
              <b>Sản phẩm:</b>
            </p>
            <ul>
              {selectedOrder.orderDetails?.map((item, idx: number) => (
                <li key={idx}>
                  {item.productName} ({item.size}) - {item.quantity} x{" "}
                  {item.unitPrice?.toLocaleString()}₫
                </li>
              ))}
            </ul>
            <p>
              <b>Tổng tiền:</b> {selectedOrder.price?.toLocaleString()}₫
            </p>
            <p>
              <b>Trạng thái đơn:</b> {selectedOrder.orderStatus}
            </p>
            <p>
              <b>Thanh toán:</b> {selectedOrder.payment?.status} -{" "}
              {selectedOrder.payment?.paymentMethod}
            </p>
          </>
        )}
      </Drawer>
    </div>
  );
};

export default OrderTable;
