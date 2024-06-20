"use client";
import React from "react";
import PasswordInput from "@/components/passInput";

export default function resetpassword() {
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        <form className="space-y-8 m-auto">
          <h2 className="mb-6 text-2xl font-bold text-left">
            Create a Password
          </h2>
          <p>Enter and confirm your new password</p>
          <label className="block font-bold mb-2">
            New Password
            <PasswordInput />
          </label>

          <label className="block font-bold mb-2">
            Confirm Password
            <PasswordInput />
          </label>
          <button className="w-full p-5 text-white bg-green-900 rounded-2xl hover:bg-green-700 ">
            Create New Password
          </button>
        </form>
      </div>
    </>
  );
}
