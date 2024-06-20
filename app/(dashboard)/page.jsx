'use client'
import React, { useState, useEffect } from 'react'

const RolesPage = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/departments');
        const data = await response.json();
        setRoles(data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {roles.map(role => (
          <li key={role.id}>{role.dept_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RolesPage;