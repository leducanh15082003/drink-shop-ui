/* eslint-disable @next/next/no-img-element */
"use client";

import NavBar from "@/components/ui/nav-bar";
import { Button, Flex } from "antd";
import { useRouter } from "next/navigation";
import CartIcon from "./cart/CartIcon";
import { useAuth } from "@/utils/context/AuthContext";
import FavoriteIcon from "./favorite/FavoriteIcon";
import Avatar from "./Avatar";
import Link from "next/link";
import { ReceiptText } from "lucide-react";

export default function Header() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <header className="sticky top-0 bg-white h-[90px] flex flex-col z-50 shadow-sm justify-center font-sans font-medium">
      <div className="flex justify-between items-center gap-12 px-14">
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
            <Link href="/profile/order">
              <ReceiptText className="cursor-pointer" color="#3B3B3B" />
            </Link>

            <CartIcon />
          </div>
          <div className="pl-4 relative flex flex-col items-center cursor-pointer">
            {isAuthenticated ? (
              <Avatar />
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
