"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordInput({ password, setPassword }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="relative w-full">
      <input
        type={passwordVisible ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
      >
        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
}
