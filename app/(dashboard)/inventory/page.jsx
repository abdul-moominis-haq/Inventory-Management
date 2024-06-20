"use client";
import { useRouter } from "next/navigation";
import styles from "@/styles/inventory.module.css";
import {MdInventory,MdArrowUpward} from "react-icons/md";
import { Eye, Edit, Trash, Search, Filter } from "react-feather";
import { format } from "date-fns";
import Link from "next/link";
import PerformanceChart from "@/components/charts/performanceChart";

const inventoryData = [
  {
    items: "Hard hats",
    category: "Personal Protective Equipment",
    quantity: 3,
    unit: "Tons",
    lowStockLevel: 4,
    cost: 2500,
    lastpurchasedDate: 10 / 9 / 2024,
    avatarUrl: "https://clipart-library.com/images/zcX5npjbi.jpg",
  },
  {
    items: "HWDP-31/2 X 19ft",
    category: "Drill Pipe",
    quantity: 50,
    unit: "Joints",
    lowStockLevel: 20,
    cost: 2500,
    lastpurchasedDate: 10 / 9 / 2024,
    avatarUrl: "https://clipart-library.com/images/zcX5npjbi.jpg",
  },
  {
    items: "NC38-31/2''Reg",
    category: "Drill Collers",
    quantity: 30,
    unit: "Joints",
    lowStockLevel: 10,
    cost: 2500,
    lastpurchasedDate: 10 / 9 / 2024,
    avatarUrl: "https://clipart-library.com/images/zcX5npjbi.jpg",
  },
  {
    items: "NC38-31/2''Reg",
    category: "Drill Collers",
    quantity: 30,
    unit: "Joints",
    lowStockLevel: 10,
    cost: 2500,
    lastpurchasedDate: 10 / 9 / 2024,
    avatarUrl: "https://clipart-library.com/images/zcX5npjbi.jpg",
  },
  {
    items: "PDC mit-17 1/2''",
    category: "Drill Bits",
    quantity: 40,
    unit: "Pieces",
    lowStockLevel: 5,
    cost: 2500,
    lastpurchasedDate: 10 / 9 / 2024,
    avatarUrl: "https://clipart-library.com/images/zcX5npjbi.jpg",
  },
];
// Dummydata for performance chart

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
  totalRequests: [25, 20, 30, 23, 19, 29],
};

const inventory = () => {
  const router = useRouter();
  const addNewInventory = () => {
    router.push("/dashboard/inventory/addInventory");
  };

  return (
    <div className="bg-gray-100 flex gap-4 align-center flex-col">
      <div className="bg-white flex p-2 gap-2">
        <h1 className="text-[#00695C] flex items-center pl-8">Inventory</h1>
        <Link
          href="/inventory/new"
          className="text-white bg-primary flex items-center py-2 px-3 rounded hover:bg-blue-900 ml-auto"
          type="button"
        >
          Add New Inventory
        </Link>
      </div>

      <div className="flex px-4 justify-center gap-6">
        <div className="flex bg-white p-4 justify-between w-1/4 rounded-lg">
          <div className="flex flex-col">
           
              <h4 className="text-textc text-xs whitespace-nowrap">
                TOTAL INVENTORY
              </h4>
              <p className="text-black font-bold">350,897</p>

              <div className="flex">
                <MdArrowUpward size={20} color="#2DCE89" />
                <p className="text-blue-950 text-xs"><span className='text-success'>3.48%</span> since last month</p>
              </div>
          </div>
          
          <div className={styles.iconContainer}>
            <MdInventory size={25} color="white" />
          </div>
        </div>

        <div className="flex bg-white p-4 justify-between  w-1/4 rounded-lg">
          <div className="flex flex-col">
            <h4 className="text-textc text-xs whitespace-nowrap">
              REQUESTED INVENTORY
            </h4>
            <p className="text-black font-bold">25</p>
            <div className="flex">
              <MdArrowUpward size={20} color="#2DCE89"/>
              <p className="text-blue-950 text-xs"><span className='text-success'>3.48%</span> since last month</p>
            </div>
          </div>
    
          <div className={styles.iconContainer}>
            <MdInventory size={25} color="white" />
          </div>
        </div>

        <div className="flex bg-white p-4 justify-between w-1/4 rounded-lg">
          <div className="flex flex-col">
            <h4 className="text-textc text-sm whitespace-nowrap">
              CATEGORIES
            </h4>
            <p className="text-black font-bold">5</p>
            <div className="flex">
              <MdArrowUpward size={20} color="#2DCE89" />
              <p className="text-blue-950 text-xs"><span className='text-success'>3.48%</span> since last month</p>
            </div>
          </div>

          <div className={styles.iconContainer}>
            <MdInventory size={25} color="white" />
          </div>
        </div>

        <div className="flex bg-white p-4 justify-between w-1/4 rounded-lg">
          <div className="flex flex-col">
            <h4 className="text-textc text-xs whitespace-nowrap">
              LOW STOCK
            </h4>
            <p className="text-black font-bold">2</p>
            <div className="flex">
              <MdArrowUpward size={20} color="#2DCE89" />
              <p className="text-blue-950 text-xs"><span className='text-success'>3.48%</span> since last month</p>
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
          <h1 className="text-textc text-xs px-6">PERFORMANCE</h1>
            <h1 className="text-xl font-bold pl-6 py-2">Total Requests</h1>
            <PerformanceChart data={chartData} />
          </div>
        </div>

        <div className="w-2/5 bg-white p-4 rounded-lg shadow-sm text-blue-950">
          <div className='flex text-sm mb-4 justify-between'>
            <h3>Most Requested Inventory</h3>
            <p>Time: Last 7 Days</p>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white">
                <th className="py-2 border-b border-gray-200 text-[0.8rem] whitespace-nowrap">
                  ITEM
                </th>
                <th className="py-2 border-b border-gray-200 text-[0.8rem] whitespace-nowrap">
                  AMOUNT REQUESTED
                </th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-3 border-b border-gray-200 text-xs whitespace-nowrap">
                    <div className="flex items-center">
                      <img src={item.avatarUrl} alt="Item" className="w-10 h-4 rounded-full"/>
                      <div className='pl-20'>{item.items}</div>
                    </div>
                  </td>

                  <td className="py-3 border-b border-gray-200 text-xs whitespace-nowrap">
                  <div className='pl-20'>{item.amountRequested}</div>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>


      <div className={styles.innerContainer}>
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" size={20} />
              <input type="text" placeholder="Search inventory by name or category" className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg text-sm"/>
            </div>
          </div>
          
          <button href="#" className="px-3 py-1 bg-white-500 flex items-center text-black text-xs rounded-lg border border-gray-300"> 
            <Filter size={15}/>
            Filter
          </button>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.orderTable}>
            <thead>
              <tr>
                <th className={styles.tableHead}>ITEM</th>
                <th className={styles.tableHead}>CATEGORY</th>
                <th className={styles.tableHead}>QUANTITY</th>
                <th className={styles.tableHead}>UNIT</th>
                <th className={styles.tableHead}>LOW STOCK LEVEL</th>
                <th className={styles.tableHead}>COST</th>
                <th className={styles.tableHead}>LAST PURCHASED DATE</th>
                <th className={styles.tableHead}>ACTION</th>
              </tr>
            </thead>
            
            <tbody>
              {inventoryData.map((inventory) => (
                <tr key={inventory.id}>
                  <td className={styles.tableData}><div className="flex items-center">
                <input type="checkbox" className="mr-2" /> 
                <div className="flex items-center">
                  <img src={inventory.avatarUrl} alt={inventory.items} className="h-5 w-5 mr-2 rounded-full" /> 
                  {inventory.items}
                </div>
              </div>
              </td>
                  <td className={styles.tableData}>{inventory.category}</td>
                  <td className={styles.tableData}>{inventory.quantity}</td>
                  <td className={styles.tableData}>{inventory.unit}</td>
                  <td className={styles.tableData}>{inventory.lowStockLevel}</td>
                  <td className={styles.tableData}>{inventory.cost}</td>
                  <td className={styles.tableData}>
                    <time>{format(inventory.lastpurchasedDate, 'dd/mm/yyy')}</time>
                  </td>
                  <td className="flex gap-2 pt-4">
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

export default inventory;
