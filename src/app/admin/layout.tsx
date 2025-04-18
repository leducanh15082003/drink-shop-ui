import type { Metadata } from "next";
import { DM_Sans, Poppins, Playfair_Display } from "next/font/google";
import "../globals.css";
import { ConfigProvider } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/utils/context/AuthContext";
import SideMenu from "@/components/admin/SideMenu";
import Avatar from "@/components/Avatar";
import "@ant-design/v5-patch-for-react-19"; // 👈 Nhớ ở trên cùng

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: "HCT - Home Page",
  description: "Home Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${poppins.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#AD343E",
                borderRadius: 2,
              },
              components: {
                Slider: {
                  controlHeight: 5,
                  railSize: 10,
                  borderRadiusXS: 10,
                },
              },
            }}
          >
            <div className="flex min-h-screen text-black">
              {/* Sidebar */}
              <div className="w-64 bg-white border-r shadow pt-10">
                <SideMenu />
              </div>

              {/* Main content */}
              <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-16 bg-white shadow px-6 flex items-center justify-between">
                  <h1 className="text-lg font-semibold">Admin Dashboard</h1>
                  {/* Bạn có thể thêm avatar, user info ở đây nếu muốn */}

                  <Avatar />
                </header>

                {/* Page content */}
                <main className="flex-1 p-6 bg-gray-50">{children}</main>
              </div>
            </div>
          </ConfigProvider>
        </AuthProvider>

        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
