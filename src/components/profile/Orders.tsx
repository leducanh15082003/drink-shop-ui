"use client";
import { OrderDTO } from "@/utils/services/Api";
import { htcService } from "@/utils/services/htcService";
import { Tabs } from "antd";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PROCESSING: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

function OrderCard({ order }: { order: OrderDTO }) {
  return (
    <div className="border rounded-xl p-4 bg-white shadow space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold">Order #{order.id}</div>
          <div className="text-sm text-gray-500">
            {format(
              new Date(order.orderTime as string),
              "MMMM dd, yyyy 'at' HH:mm"
            )}
          </div>
        </div>
        <div
          className={clsx(
            "px-2 py-1 text-sm rounded",
            statusColors[order.orderStatus as keyof typeof statusColors]
          )}
        >
          {order.orderStatus}
        </div>
      </div>

      <div className="flex">
        <div className="text-sm text-gray-700 space-y-1 flex-1">
          {order.orderDetails?.map((item, idx) => (
            <div key={idx}>
              {item.productName} - Size: {item.size} | Sugar: {item.sugarRate} |
              Ice: {item.iceRate} | Quantity: {item.quantity}
            </div>
          ))}
        </div>

        <div className="text-sm text-gray-600 space-y-1 flex-1">
          <div>
            📍 <strong>Delivery Address:</strong> {order.address}
          </div>
          <div>
            📞 <strong>Phone:</strong> {order.phoneNumber}
          </div>
          {order.payment?.paymentMethod && (
            <div>
              💳 <strong>Payment Method:</strong> {order.payment?.paymentMethod}
            </div>
          )}
          {order.payment?.status && (
            <div>
              📄 <strong>Payment Status:</strong> {order.payment?.status}
            </div>
          )}
        </div>
      </div>

      <div className="text-right font-semibold text-lg text-primary">
        {order.price?.toLocaleString()}₫
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  useEffect(() => {
    htcService.api.getOrdersByUserId().then((res) => setOrders(res.data));
  }, []);
  const current = orders.filter((o) =>
    ["PENDING", "PROCESSING"].includes(o.orderStatus!)
  );
  const history = orders.filter((o) =>
    ["COMPLETED", "CANCELLED"].includes(o.orderStatus!)
  );

  return (
    <Tabs
      defaultActiveKey="1"
      items={[
        {
          key: "1",
          label: "Now",
          children: (
            <div className="space-y-4">
              {current.map((o) => (
                <OrderCard key={o.id} order={o} />
              ))}
            </div>
          ),
        },
        {
          key: "2",
          label: "History",
          children: (
            <div className="space-y-4">
              {history.map((o) => (
                <OrderCard key={o.id} order={o} />
              ))}
            </div>
          ),
        },
      ]}
    />
  );
}
