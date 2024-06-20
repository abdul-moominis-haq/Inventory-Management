"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PasswordInput from "../components/passInput";
import { postData } from "../utils/apiCalls";
import Notification from "./Notification";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = { email, password };
    console.log('Form Data:', formData);

    try {
      const response = await postData('login', false, formData);
      console.log('Login Response:', response);

      if (response.token) {
        localStorage.setItem("fh_user", JSON.stringify(response));
        setNotification({ type: 'success', message: 'Login Successful' });
        router.replace("/");
      } else {
        throw new Error('Token not received');
      }
    } catch (error) {
      console.error('Error:', error);
      setNotification({ type: 'error', message: error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="space-y-8 m-auto w-96">
        <h2 className="mb-6 text-2xl font-bold text-left">Sign In</h2>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
        <p>Enter your email and password to sign in</p>
        <label className="block font-bold mb-2">
          Email
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </label>

        <label className="block font-bold mb-2">
          Password
          <PasswordInput password={password} setPassword={setPassword} />
        </label>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="text-gray-700">
            Remember me
          </label>
        </div>

        <button
          type="submit"
          className="w-full p-5 text-white bg-green-900 rounded-2xl hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"} 
        </button>
        <p>
          Have you forgotten your password?{" "}
          <Link
            href={"/resetpassword"}
            className="underline text-green-700 hover:text-green-900"
          >
            Reset Password
          </Link>
        </p>
      </form>
    </div>
  );
}
