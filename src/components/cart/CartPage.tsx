"use client";
import QuantityButton from "@/app/(customer)/menu/product-detail/components/QuantityButton";
import { CartItem, useCartStore } from "@/utils/store/cartStore";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Table, TableProps, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Coins, CreditCard } from "lucide-react";
import clsx from "clsx";
import { formatCurrency } from "@/utils/format/formatCurrency";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCartStore();
  const [paymentMethod, setPaymentMethod] = React.useState("Cash");
  const route = useRouter();

  const columns: TableProps<CartItem>["columns"] = [
    {
      title: "Product",
      dataIndex: "image",
      render: (_, record) => (
        <div className="flex gap-4 items-center">
          <Image src={record.image} width={100} height={100} alt="" />
          <Link href={`/menu/product-detail/${record.id}`}>
            <Text strong>
              {record.name} ({record.size} - {`${record.sugar} Sugar`} -
              {`${record.ice} Ice`})
            </Text>
          </Link>
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (_, record) => (
        <QuantityButton
          key={record.id}
          onChange={(value) => updateQuantity(record.id, value)}
          value={record.quantity}
        />
      ),
    },
    {
      title: "Total Price",
      align: "right",
      render: (_, record) => (
        <Text>{formatCurrency(record.price * record.quantity)}</Text>
      ),
    },
    {
      title: "",
      align: "center",
      render: (_, record) => (
        <Button
          key={record.id}
          type="text"
          danger
          onClick={() => removeFromCart(record.id)}
        >
          <CloseOutlined />
        </Button>
      ),
    },
  ];

  return (
    <div className="p-16 bg-white mx-auto">
      <Title level={2}>Shopping Cart</Title>

      <div className="flex gap-4 mt-10">
        <Table
          className="w-4/5"
          rowKey="id"
          columns={columns}
          dataSource={cart}
          pagination={false}
          summary={() => (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} />
              <Table.Summary.Cell index={1}>
                <Text strong>Total:</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={0} align="right">
                <Text strong type="success">
                  {formatCurrency(
                    cart.reduce(
                      (acc, item) => acc + item.price * item.quantity,
                      0
                    )
                  )}
                </Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={0} />
            </Table.Summary.Row>
          )}
        />

        <Card className="w-1/4 rounded-lg">
          <div className="flex flex-col justify-between items-stretch gap-4">
            <Title level={3}>Pay by</Title>

            <div className="flex flex-col gap-4">
              <Button
                onClick={() => setPaymentMethod("Cash")}
                size="large"
                className={clsx(
                  "rounded-lg",
                  paymentMethod === "Cash" && "bg-red-100"
                )}
              >
                <Coins /> Cash
              </Button>
              <Button
                onClick={() => setPaymentMethod("Banking")}
                size="large"
                className={clsx(
                  "rounded-lg",
                  paymentMethod === "Banking" && "bg-red-100"
                )}
              >
                <CreditCard /> Bank Transfer
              </Button>
            </div>

            <Button
              type="primary"
              size="large"
              className="mt-4 rounded-lg"
              disabled={cart.length === 0}
              onClick={() => {
                route.push(`/cart/checkout?paymentMethod=${paymentMethod}`);
              }}
            >
              Order now
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CartPage;
