'use client'
import React from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

const Content = ({ children }) => {
  return <div className="flex flex-col flex-grow p-10">{children}</div>;
};

const DashboardLayout = ({ children }) => {
  return (
    <ProtectedRoute>
      <div className="flex h-screen min-w-fit">
        <div>
          <Sidebar />
        </div>
        <div className="flex flex-col w-full">
          <Navbar />
          <div className="flex flex-grow overflow-y-auto">
            <Content>{children}</Content>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
