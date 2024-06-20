import React, { createContext, useContext, useEffect, useState } from 'react';
import { getData } from '@/utils/apiCalls';

const CommonStoreContext = createContext();

export const useCommonStore = () => useContext(CommonStoreContext);

export const CommonStoreProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [snackBar, setSnackBar] = useState({ message: '', show: false });
  const [inventory, setInventory] = useState([]);
  const [requisitions, setRequisitions] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  useEffect(() => {
    fetchDepartments();
    fetchRoles();
    fetchInventory();
    fetchRequisitions();
    fetchPurchaseOrders();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await getData('departments/', true);
      setDepartments(res);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await getData('roles/', true);
      const mappedRoles = res.map(item => ({ id: item.id, name: item.role_name.toUpperCase() }));
      setRoles(mappedRoles);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const fetchInventory = async () => {
    try {
      const res = await getData('inventories/', true); 
      setInventory(res);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const fetchRequisitions = async () => {
    try {
      const res = await getData('requisitions/', true); 
      setRequisitions(res);
    } catch (error) {
      console.error('Error fetching requisitions:', error);
    }
  };

  const fetchPurchaseOrders = async () => {
    try {
      const res = await getData('purchaseOrders/', true);
      setPurchaseOrders(res);
    } catch (error) {
      console.error('Error fetching purchase orders:', error);
    }
  };

  const getRoleById = (id) => {
    try {
      const role = roles.find(role => role.id === id);
      return role || null;
    } catch (error) {
      console.error('Error getting role by ID:', error);
      return null;
    }
  };

  const showSnackBar = (text = 'Something New') => {
    setSnackBar({ message: text, show: true });
  };

  const hideSnackBar = () => {
    setSnackBar({ ...snackBar, show: false });
  };

  const store = {
    departments,
    roles,
    snackBar,
    inventory,
    requisitions,
    purchaseOrders,
    fetchDepartments,
    fetchRoles,
    fetchInventory,
    fetchRequisitions,
    fetchPurchaseOrders,
    getRoleById,
    showSnackBar,
    hideSnackBar
  };

  return (
    <CommonStoreContext.Provider value={store}>
      {children}
    </CommonStoreContext.Provider>
  );
};
