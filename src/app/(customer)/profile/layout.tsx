"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const tabs = [
  { name: "Profile", href: "/profile" },
  { name: "Orders", href: "/profile/order" },
];

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex mx-auto bg-[#F2F4F5]">
      {/* Sidebar */}
      <aside className="w-[20%] border-r pr-4 p-10 bg-white">
        <nav className="space-y-2">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={clsx(
                  "block px-4 py-2 rounded-md font-medium transition",
                  isActive
                    ? "bg-[#AD343E] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 pl-6">{children}</main>
    </div>
  );
}
