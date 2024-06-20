"use client";

import React from "react";
import { Eye, Edit, Trash,Plus, Search, Filter, CheckCircle } from "react-feather";
import { MdPerson } from "react-icons/md";
import Link from 'next/link';
import styles from "@/styles/product.module.css";

const productData = [
  {
    productName: "Macbook Air",
    category: "Office",
    brand: "Macbook",
    inStock: 50,
    reorderLevel: 3,
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRzgAAWclIJiyTEe2RV6YACHOfymuJsM8Luw&usqp=CAU", // Add the avatar URL here
  },
  {
    productName: "Macbook Air",
    category: "Office",
    brand: "Macbook",
    inStock: 50,
    reorderLevel: 3,
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRzgAAWclIJiyTEe2RV6YACHOfymuJsM8Luw&usqp=CAU", // Add the avatar URL here
  },
  {
    productName: "Macbook Air",
    category: "Office",
    brand: "Macbook",
    inStock: 50,
    reorderLevel: 3,
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRzgAAWclIJiyTEe2RV6YACHOfymuJsM8Luw&usqp=CAU", // Add the avatar URL here
  },
  {
    productName: "Macbook Air",
    category: "Office",
    brand: "Macbook",
    inStock: 50,
    reorderLevel: 3,
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRzgAAWclIJiyTEe2RV6YACHOfymuJsM8Luw&usqp=CAU", // Add the avatar URL here
  },
  {
    productName: "Macbook Air",
    category: "Office",
    brand: "Macbook",
    inStock: 50,
    reorderLevel: 3,
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRzgAAWclIJiyTEe2RV6YACHOfymuJsM8Luw&usqp=CAU", // Add the avatar URL here
  },
  {
    productName: "Macbook Air",
    category: "Office",
    brand: "Macbook",
    inStock: 50,
    reorderLevel: 3,
    avatarUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRzgAAWclIJiyTEe2RV6YACHOfymuJsM8Luw&usqp=CAU", // Add the avatar URL here
  },
  {
    productName: "Macbook Air",
    category: "Office",
    brand: "Macbook",
    inStock: 50,
    reorderLevel: 3,
    avatarUrl:
      "https://media.istockphoto.com/id/1478610778/photo/hcmc-vietnam-macbook-pro-14-inches-m2.jpg?s=612x612&w=0&k=20&c=Rl05e5NYO0YS9DuvgeE4AUmjJw-FgD37_mpTCKVyeng=", // Add the avatar URL here
  },
];

const product = () => {
    const options = ["All Products", "Product 1", "Product 2", "Product 3", "Product 4"];
  return (
    <main>
      <div className={styles.innerContainer}>
        <div className="flex justify-between mb-4 pb-6">
          <div className="flex items-center">
            <div className="relative">
              <h1 className="font-bold">Showing</h1>
            </div>
            <select className="ml-2 border border-gray-200 rounded-md px-2 py-1 text-blue-600 font-bold">
              {options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Search</button> */}
          </div>
          <Link
          href="/dashboard/workorders/neworder"
          className="text-white text-lg bg-[#047857] flex items-center py-2 px-3 rounded hover:bg-blue-900 ml-auto"
        >
          <Plus size={18} />
          New Product
        </Link>
        </div>

        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <div className="relative">
              <h3>Light table</h3>
            </div>
            {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Search</button> */}
          </div>
          <button href="#" className="px-3 py-1 bg-white-500 flex items-center text-black text-xs rounded-lg border border-gray-300"> 
            <MdPerson size={15}/>
            Export
          </button>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.orderTable}>
            <thead>
              <tr>
                <th className={styles.tableHead}>PRODUCT NAME</th>
                <th className={styles.tableHead}>CATEGORY</th>
                <th className={styles.tableHead}>BRAND</th>
                <th className={styles.tableHead}>IN STOCK</th>
                <th className={styles.tableHead}>REORDER LEVEL</th>
                <th className={styles.tableHead}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {productData.map((product) => (
                <tr key={product.id}>
                  <td className={styles.tableData}>
                    {/* Add a checkbox and avatar */}
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />{" "}
                      {/* Checkbox */}
                      <div className="flex items-center">
                        <img
                          src={product.avatarUrl}
                          alt={product.productName}
                          className="h-7 w-7 mr-2 rounded-full"
                        />{" "}
                        {/* Avatar */}
                        {product.productName}
                      </div>
                    </div>
                  </td>
                  <td className={styles.tableData}>{product.category}</td>
                  <td className={styles.tableData}>{product.brand}</td>
                  <td className={styles.tableData}>{product.inStock}</td>
                  <td className={styles.tableData}>{product.reorderLevel}</td>
                  <td className="flex gap-2 pt-4">
                    {/* Action icons */}
                    <MdPerson
                      height="15px"
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
                        handleDelete(product);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default product;
