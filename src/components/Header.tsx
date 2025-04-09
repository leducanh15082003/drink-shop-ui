/* eslint-disable @next/next/no-img-element */
"use client";

import NavBar from "@/components/ui/nav-bar";
import { Button, Flex, Dropdown, MenuProps } from "antd";
import { useRouter } from "next/navigation";
import CartIcon from "./cart/CartIcon";
import { useAuth } from "@/utils/context/AuthContext";
import FavoriteIcon from "./favorite/FavoriteIcon";

export default function Header() {
  const { currentUser, isAuthenticated, logout } = useAuth();
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
    {
      key: "profile",
      label: (
        <div onClick={() => router.push("/profile")} className="cursor-pointer">
          Thông tin cá nhân
        </div>
      ),
    },
    {
      key: "logout",
      label: (
        <div onClick={logout} className="cursor-pointer text-red-500">
          Đăng xuất
        </div>
      ),
    },
  ];

  return (
    <header className="sticky top-0 bg-white h-[90px] flex flex-col z-50 shadow-sm justify-center font-sans font-medium">
      <div className="flex justify-end items-center gap-12 pr-14">
        <div className="text-black flex gap-4">
          <NavBar />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search Product..."
            className="w-[300px] px-4 py-1 pr-10 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-sm placeholder:font-sans"
          />
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <path
              d="M7.1875 13.125C10.4667 13.125 13.125 10.4667 13.125 7.1875C13.125 3.90831 10.4667 1.25 7.1875 1.25C3.90831 1.25 1.25 3.90831 1.25 7.1875C1.25 10.4667 3.90831 13.125 7.1875 13.125Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.75 13.75L12.5 12.5"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex items-center">
          <div className="flex gap-4 px-4 border-r-[1px] border-[#3B3B3B]">
            <FavoriteIcon />
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
            <CartIcon />
          </div>
          <div className="pl-4 relative flex flex-col items-center cursor-pointer">
            {isAuthenticated ? (
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
            ) : (
              <Flex gap="small" wrap>
                <Button
                  type="primary"
                  className="rounded-md"
                  onClick={() => router.push("/signin")}
                >
                  Log In
                </Button>
              </Flex>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
