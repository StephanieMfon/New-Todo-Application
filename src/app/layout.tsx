"use client";

import { Roboto } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import { Provider } from "react-redux";
import store from "./redux/store";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={roboto.className}>
          <Sidebar>{children}</Sidebar>
        </body>
      </html>
    </Provider>
  );
}
