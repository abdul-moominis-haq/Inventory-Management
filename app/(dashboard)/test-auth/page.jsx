'use client'
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const TestAuthPage = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">Not Authenticated</h1>
        <p>Please login with username "admin" and password "admin2211"</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Authentication Successful!</h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl mb-2">User Information:</h2>
        <pre className="text-sm">{JSON.stringify(user, null, 2)}</pre>
      </div>
      <button
        onClick={logout}
        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default TestAuthPage;
