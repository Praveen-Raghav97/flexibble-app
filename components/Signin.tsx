"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaGoogle, FaLinkedin, FaGithub } from "react-icons/fa";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        console.error(res.error);
        toast.error("Failed to login: " + res.error);
      } else {
        toast.success("Login Successful!");
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    }
  };

  const handleSocialSignIn = async (provider: string) => {
    try {
      const res = await signIn(provider, {
        redirect: false,
        callbackUrl: "/",
      });

      if (res?.error) {
        toast.error("Failed to login: " + res.error);
      } else {
        toast.success(`Logged in with ${provider}!`);
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Welcome Back!
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Sign in to continue browsing.
        </p>

        {/* Sign-In Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-500 my-4">OR</p>

        {/* Social Sign-In Buttons */}
        <div className="space-y-3">
          <button
            className="w-full flex items-center justify-center px-4 py-2 border rounded-md hover:bg-gray-100 transition"
            onClick={() => handleSocialSignIn("google")}
          >
            <FaGoogle className="text-orange-500 mr-2" /> Continue with Google
          </button>
          <button
            className="w-full flex items-center justify-center px-4 py-2 border rounded-md hover:bg-gray-100 transition"
            onClick={() => handleSocialSignIn("linkedin")}
          >
            <FaLinkedin className="text-blue-500 mr-2" /> Continue with LinkedIn
          </button>
          <button
            className="w-full flex items-center justify-center px-4 py-2 border rounded-md hover:bg-gray-100 transition"
            onClick={() => handleSocialSignIn("github")}
          >
            <FaGithub className="mr-2" /> Continue with GitHub
          </button>
        </div>

        {/* Additional Links */}
        <p className="text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link href="/signup">
            <a className="text-blue-600 font-medium hover:underline">Sign Up</a>
          </Link>
        </p>
        <p className="text-center text-gray-400 text-sm mt-2">
          By signing in, you agree to our{" "}
          <span className="text-blue-600 underline cursor-pointer">
            Terms and Policy
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default SignIn;
