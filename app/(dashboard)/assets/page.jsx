"use client";
import { useRouter } from "next/navigation";
import styles from "@/styles/Assets.module.css";
import {
  MdInventory,
  MdArrowUpward,
  MdDirectionsCarFilled,
  MdOutlinePrecisionManufacturing,
  MdChairAlt,
} from "react-icons/md";
import { RiHomeOfficeFill, RiBuilding2Line } from "react-icons/ri";
import { Eye, Edit, Trash, Search, Filter } from "react-feather";
import { format } from "date-fns";
import Link from "next/link";
import ReportChart from "../../../components/charts/assetAquiredChart";

const assetsData = [
  {
    assetsName: "Toyota Highlander",
    category: "Vehicles",
    quantity: 3,
    assetsId: "WT2500",
    purchasedDate: "10/9/2024",
    assetsUser: "JHON DOE",
    avatarUrl: "https://clipart-library.com/images/zcX5npjbi.jpg", // Add the avatar URL here
  },
  {
    assetsName: "HP LAPTOP",
    category: "Office",
    quantity: 3,
    assetsId: "AP2500",
    purchasedDate: "10/9/2024",
    assetsUser: "JHON DOE",
    avatarUrl: "https://clipart-library.com/images/zcX5npjbi.jpg", // Add the avatar URL here
  },
  {
    assetsName: "TOP DRIVE ROTORY DRILL RIG",
    category: "Equipment",
    quantity: 12,
    assetsId: "WD2500",
    purchasedDate: "10/9/2024",
    assetsUser: "JHON DOE",
    avatarUrl: "https://clipart-library.com/images/zcX5npjbi.jpg", // Add the avatar URL here
  },
  {
    assetsName: "Toyota Highlander",
    category: "Vehicles",
    quantity: 5,
    assetsId: "AT2500",
    purchasedDate: "10/9/2024",
    assetsUser: "JHON DOE",
    avatarUrl: "https://clipart-library.com/images/zcX5npjbi.jpg", // Add the avatar URL here
  },
  {
    assetsName: "CANNON C-IRA42451",
    category: "Vehicles",
    quantity: 3,
    assetsId: "AS2500",
    purchasedDate: "10/9/2024",
    assetsUser: "RICHARD MILES",
    avatarUrl: "https://clipart-library.com/images/zcX5npjbi.jpg", // Add the avatar URL here
  },
];

//Dummydata for performance chart

const dummyData = [
  {
    items: "Hard Hats",
    amountRequested: 12,
  },
  {
    items: "High Yield Bentonite",
    amountRequested: 20,
  },
  {
    items: "NC38-31/2''Reg",
    amountRequested: 15,
  },
  {
    items: "HWDP-31/2'' x 19ft",
    amountRequested: 25,
  },
  {
    items: "Top Drive Rotary Drill",
    amountRequested: 67,
  },
];

const chartData = {
  months: ["January", "February", "March", "April", "May", "June"],
  totalReports: [25, 20, 30, 23, 19, 29], // Example data for total requests per month
};

const categoriesWithIcons = [
  { category: "Offices", icon: <RiHomeOfficeFill /> },
  { category: "Vehicles", icon: <MdDirectionsCarFilled /> },
  { category: "Machines", icon: <MdOutlinePrecisionManufacturing /> },
  { category: "Buildings", icon: <RiBuilding2Line /> },
  { category: "Furnitures", icon: <MdChairAlt /> },
];

const assets = () => {
  const router = useRouter();
  const addNewInventory = () => {
    router.push("#");
  };

  return (
    <div className="bg-gray-100 flex gap-4 flex-col">
      <div className="bg-white flex p-2 gap-2">
        <h1 className="text-[#00695C]  flex items-center pl-8">Assets</h1>
        <Link
          href="/assets/new"
          className="text-white bg-primary flex items-center py-2 px-3 rounded hover:bg-blue-900 ml-auto"
          type="button"
        >
          Add New Asset
        </Link>
      </div>

      <div className="flex px-4 justify-center gap-6">
        <div className="flex bg-white p-4 justify-between w-1/4 rounded-lg">
          <div className="flex flex-col">
            <Link href="#">
              <h4 className="text-textc text-xs whitespace-nowrap">
                NUMBER OF ASSETS
              </h4>
              <p className="text-black font-bold">350,897</p>

              <div className="flex">
                <MdArrowUpward size={20} color="#2DCE89" />
                <p className="text-blue-950 text-xs">
                  <span className="text-success">3.48%</span> since last month
                </p>
              </div>
            </Link>
          </div>

          <div className={styles.iconContainer}>
            <MdInventory size={25} color="white" />
          </div>
        </div>
        <div className="flex bg-white p-4 justify-between  w-1/4 rounded-lg">
          <div className="flex flex-col">
            <h4 className="text-textc text-xs whitespace-nowrap">NEW ASSETS</h4>
            <p className="text-black font-bold">25</p>
            <div className="flex">
              <MdArrowUpward size={20} color="#2DCE89" />
              <p className="text-blue-950 text-xs">
                <span className="text-success">3.48%</span> since last month
              </p>
            </div>
          </div>

          <div className={styles.iconContainer}>
            <MdInventory size={25} color="white" />
          </div>
        </div>
        <div className="flex bg-white p-4 justify-between w-1/4 rounded-lg">
          <div className="flex flex-col">
            <h4 className="text-textc text-xs ">CATEGORIES OF ASSETS</h4>
            <p className="text-black font-bold">5</p>
            <div className="flex">
              <MdArrowUpward size={20} color="#2DCE89" />
              <p className="text-blue-950 text-xs">
                <span className="text-success">3.48%</span> since last month
              </p>
            </div>
          </div>

          <div className={styles.iconContainer}>
            <MdInventory size={25} color="white" />
          </div>
        </div>
        <div className="flex bg-white p-4 justify-between w-1/4 rounded-lg">
          <div className="flex flex-col">
            <h4 className="text-textc text-xs ">ASSETS DUE TO PERFORMANCE</h4>
            <p className="text-black font-bold">2</p>
            <div className="flex">
              <MdArrowUpward size={20} color="#2DCE89" />
              <p className="text-blue-950 text-xs">3.48% since last month</p>
            </div>
          </div>
          <div className={styles.iconContainer}>
            <MdInventory size={25} color="white" />
          </div>
        </div>
      </div>

      <div className="flex px-4 justify-center gap-6 text-blue-950 mb-4">
        <div className="w-3/5 bg-white p-4 rounded-lg shadow-sm text-blue-950">
          <div>
            <h1 className="text-textc text-xs px-6">NEW ASSETS AQUIRED</h1>
            <h1 className="text-2xl font-bold pl-6 py-2">REPORTS</h1>
            <ReportChart data={chartData} />
          </div>
        </div>

        <div className="w-2/5 bg-white p-4 rounded-lg shadow-sm text-blue-950">
          <h3 className="text-sm mb-4 font-bold">CATEGORIES OF ASSETS</h3>
          <div className="bg-white flex p-2 gap-2">
            <h1 className="text-blue-950 flex items-center text-sm">
              CATEGORIES
            </h1>
            <Link
              href="/assets/categories"
              className="text-blue-800 font-bold flex items-center py-2 px-8  ml-auto  text-sm"
            >
              SEE ALL
            </Link>
          </div>
          <div className="border-b border-gray-200">
            {categoriesWithIcons.map((item, index) => (
              <div
                key={index}
                className="flex items-center py-4 border-b border-gray-200 hover:text-blue-500"
              >
                {item.icon} {/* Icon */}
                <a href="#" className="flex-grow">
                  {item.category}
                </a>{" "}
                {/* Category link */}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.innerContainer}>
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <div className="relative">
              <Search
                className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
              <input
                type="text"
                placeholder="Search for assets by name or category"
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Search</button> */}
          </div>
          <button
            href="#"
            className="px-3 py-1 bg-white-500 flex items-center text-black text-xs rounded-lg border border-gray-300"
          >
            <Filter size={15} />
            Filter
          </button>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.orderTable}>
            <thead>
              <tr>
                <th className={styles.tableHead}>ASSETS NAME</th>
                <th className={styles.tableHead}>CATEGORY</th>
                <th className={styles.tableHead}>QUANTITY</th>
                <th className={styles.tableHead}>ASSETS ID</th>
                <th className={styles.tableHead}>ASSET USER</th>
                <th className={styles.tableHead}>PURCHASED DATE</th>
                <th className={styles.tableHead}>Action</th>
              </tr>
            </thead>
            <tbody>
              {assetsData.map((asset) => (
                <tr key={asset.id}>
                  <td className={styles.tableData}>
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <div className="flex items-center">
                        <img
                          src={asset.avatarUrl}
                          alt={asset.assetsName}
                          className="h-5 w-5 mr-2 rounded-full"
                        />
                        {asset.assetsName}
                      </div>
                    </div>
                  </td>
                  <td className={styles.tableData}>{asset.category}</td>
                  <td className={styles.tableData}>{asset.quantity}</td>
                  <td className={styles.tableData}>{asset.assetsId}</td>
                  <td className={styles.tableData}>{asset.assetsUser}</td>
                  <td className={styles.tableData}>
                    <time>{format(asset.purchasedDate, "dd/mm/yyy")}</time>
                  </td>
                  <td className="flex gap-3 pt-4">
                    <Eye
                      height="15px"
                      width="15px"
                      color="#002161"
                      onClick={() => {
                        router.push();
                      }}
                    />
                    <Edit
                      height="15x"
                      width="15px"
                      color="#002161"
                      onClick={() => {
                        router.push();
                      }}
                    />
                    <Trash
                      height="15px"
                      width="15px"
                      color="#521318"
                      onClick={() => {
                        handleDelete(asset);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default assets;
