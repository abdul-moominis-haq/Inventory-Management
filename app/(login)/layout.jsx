import React from "react";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function LoginLayout({ children }) {
  return (
    <body className={inter.className}>
      <div className=" overflow-hidden flex h-screen bg-gray-100 py-8 px-5">
        <div className="w-1/2 p-8">{children}</div>
        <div className="flex items-center justify-center w-1/2 bg-gray-200 rounded-2xl">
          <img
            src="/path-to-your-image.jpg"
            alt="Warehouse Image"
            className="max-h-screen object-cover"
          />
        </div>
      </div>
    </body>
  );
}
