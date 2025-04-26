"use client";

import { supabase } from "@/utils/lib/supabase";
import { Badge, Dropdown } from "antd";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Notification {
  id: number;
  title: string;
  content: string;
  link: string;
  is_read: boolean;
  created_at: string;
  dataid: string;
  type: string;
}

const NotificationIcon = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const router = useRouter();

  const fetchNotifications = async () => {
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      setNotifications(data);
    }
  };

  useEffect(() => {
    const channel = supabase
      .channel("notifications-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
        },
        (payload) => {
          const newNotif = payload.new as Notification;
          toast.info(`${newNotif.title}: ${newNotif.content}`, {
            onClick: () => {
              if (newNotif.link) {
                router.push(newNotif.link);
              }
            },
            autoClose: 8000,
          });

          setNotifications((prev) => [newNotif, ...prev]); // Thêm vào đầu danh sách
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <Dropdown
      menu={{
        items: notifications.map((notification) => ({
          key: notification.id,
          label: (
            <NotificationBlock
              notification={notification}
              fetchNotifications={fetchNotifications}
            />
          ),
        })),
      }}
      placement="bottomRight"
      arrow
      trigger={["click"]}
    >
      <Badge count={unreadCount} offset={[-5, 5]}>
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer"
        >
          <path
            d="M12.5209 3.03125C9.07295 3.03125 6.27086 5.83333 6.27086 9.28125V12.2917C6.27086 12.9271 6.00003 13.8958 5.67711 14.4375L4.4792 16.4271C3.73961 17.6563 4.25003 19.0208 5.6042 19.4792C10.0938 20.9792 14.9375 20.9792 19.4271 19.4792C20.6875 19.0625 21.2396 17.5729 20.5521 16.4271L19.3542 14.4375C19.0417 13.8958 18.7709 12.9271 18.7709 12.2917V9.28125C18.7709 5.84375 15.9584 3.03125 12.5209 3.03125Z"
            stroke="black"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
          <path
            d="M14.4479 3.33337C14.125 3.23962 13.7917 3.16671 13.4479 3.12504C12.4479 3.00004 11.4896 3.07296 10.5938 3.33337C10.8958 2.56254 11.6458 2.02087 12.5208 2.02087C13.3958 2.02087 14.1458 2.56254 14.4479 3.33337Z"
            stroke="black"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.6458 19.8541C15.6458 21.5729 14.2395 22.9791 12.5208 22.9791C11.6666 22.9791 10.8749 22.625 10.3124 22.0625C9.74992 21.5 9.39575 20.7083 9.39575 19.8541"
            stroke="black"
            strokeWidth="1.5"
            strokeMiterlimit="10"
          />
        </svg>
      </Badge>
    </Dropdown>
  );
};

const NotificationBlock = ({
  notification,
  fetchNotifications,
}: {
  notification: Notification;
  fetchNotifications: () => void;
}) => {
  const [isRead, setIsRead] = useState(notification.is_read);
  const router = useRouter();

  const handleClick = async () => {
    if (!isRead) {
      const response = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("id", notification.id);
      if (response.status == 204) {
        fetchNotifications();
        setIsRead(true);
        router.push(notification.link);
      }
      console.log(response);
    }
    // TODO: Bạn có thể thêm điều hướng nếu có `notification.link`
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "cursor-pointer p-4 rounded-lg transition-all",
        !isRead ? "bg-white" : "bg-gray-50"
      )}
    >
      <div className="flex justify-between items-start gap-2">
        <div>
          <p className="font-semibold text-base">{notification.title}</p>
          <p className="text-sm text-gray-600">{notification.content}</p>
        </div>
        {!isRead && <span className="w-2 h-2 bg-red-500 rounded-full mt-1" />}
      </div>
      <p className="text-xs text-gray-400 mt-2">
        {format(new Date(notification.created_at), "dd/MM/yyyy HH:mm")}
      </p>
    </div>
  );
};

export default NotificationIcon;
