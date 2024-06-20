// import React from "react";
// import Sidebar from "@/components/Sidebar";
// import Navbar from "@/components/Navbar";

// const Content = ({ children }) => {
//     return <div className="flex flex-col flex-grow p-10">{children}</div>;
//   };

// //Let's check if localStorage(fh_user) is set when this is being rendered if not then reroute to LoginLayout

// const DashboardLayout = ({ children }) => {
//   return (
//     <div className="flex h-screen min-w-fit">
//           <div>
//             <Sidebar />
//           </div>
//           <div className="flex flex-col w-full">
//             <Navbar />
//             <div className="flex flex-grow overflow-y-auto">
//               <Content>{children}</Content>
//             </div>
//           </div>
//     </div>
//   );
// };

// export default DashboardLayout;

'use client'
import React, { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation"; 

const Content = ({ children }) => {
  return <div className="flex flex-col flex-grow p-10">{children}</div>;
};

const DashboardLayout = ({ children }) => {
  const router = useRouter();

  // useEffect(() => {
  //   const fhUser = localStorage.getItem("fh_user");
  //   if (!fhUser) {
  //     router.replace("/login");
  //   }
  // }, []);

  return (
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
  );
};

export default DashboardLayout;
