"use client";
import styles from "@/styles/inventory.module.css";
import {MdInventory,MdArrowUpward} from "react-icons/md";
import { Eye, Edit, Trash, Search, Filter } from "react-feather";
import { format } from "date-fns";
import React, {useState} from 'react'
import RequestForm from "@/components/RequestForm";

const inventoryData = [
  {
    description: "HWDP- 31/2'x 19ft",
    request_id: "R001",
    quantity: 50,
    status: "Pending",
    part_number: "X1236-59847521",
    date: 10/9/2024,
  },
  {
    description: "NC38- 31/2' Reg",
    request_id: "R001",
    quantity: 10,
    status: "Approved",
    part_number: "X1236-59847521",
    date: 10/9/2024,
  },
  {
    description: "Triplex Mud Pump-700 HP",
    request_id: "R001",
    quantity: 3,
    status: "Closed",
    part_number: "X1236-59847521",
    date: 10/9/2024,
  },
  {
    description: "PDC Mit-17 1/2'",
    request_id: "R001",
    quantity: 15,
    status: "Pending",
    part_number: "X1236-59847521",
    date: 10/9/2024,
  },
  {
    description: "High Yield Bentonite",
    request_id: "R001",
    quantity: 100,
    status: "Approved",
    part_number: "X1236-59847521",
    date: 10/9/2024,
  },
];

const inventory = () => {

  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);

  const toggleRequestForm = () => {
    setIsRequestFormOpen(!isRequestFormOpen);
  };

  return (
    <div className="bg-gray-100 flex gap-4 align-center flex-col">
      <div className="bg-white flex p-2 gap-2">
        <h1 className="text-[#00695C] flex items-center pl-8">Requisition</h1>
        <button
          onClick={toggleRequestForm}
          className="text-white bg-primary flex items-center py-2 px-3 rounded hover:bg-blue-900 ml-auto"
          type="button"
        >
          Create New Request
        </button>
      </div>

      <div className="flex px-4 justify-center gap-6">
        <div className="flex bg-white p-4 justify-between w-1/4 rounded-lg">
          <div className="flex flex-col">
           
              <h4 className="text-textc text-xs whitespace-nowrap">
                TOTAL REQUEST
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
              PENDING REQUEST
            </h4>
            <p className="text-black font-bold">5</p>
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
              APPROVED REQUEST
            </h4>
            <p className="text-black font-bold">12</p>
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
              CLOSED REQUEST
            </h4>
            <p className="text-black font-bold">6</p>
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

      {isRequestFormOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <RequestForm
            onClose = {toggleRequestForm} 
          />
        </div>
      )}

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
                <th className={styles.tableHead}>REQUEST ID</th>
                <th className={styles.tableHead}>PART NUMBER</th>
                <th className={styles.tableHead}>DESCRIPTION</th>
                <th className={styles.tableHead}>QUANTITY REQUESTED</th>
                <th className={styles.tableHead}>REQUEST STATUS</th>
                <th className={styles.tableHead}>DATE REQUESTED</th>
                <th className={styles.tableHead}>ACTION</th>
              </tr>
            </thead>
            
            <tbody>
              {inventoryData.map((inventory) => (
                <tr key={inventory.id}>
                  <td className={styles.tableData}><div className="flex items-center">
                <input type="checkbox" className="mr-2" /> 
                <div className="flex items-center">
                  {inventory.request_id}
                </div>
              </div>
              </td>
                  <td className={styles.tableData}>{inventory.part_number}</td>
                  <td className={styles.tableData}>{inventory.description}</td>
                  <td className={styles.tableData}>{inventory.quantity}</td>
                  <td className={styles.tableData}>{inventory.status}</td>
                  <td className={styles.tableData}>
                    <time>{format(inventory.date, 'dd/mm/yyyy')}</time>
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
