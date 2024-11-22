"use client";

import { signIn } from "next-auth/react";
import { Button, TextField, Typography, Box, Container } from "@mui/material";
import { FaGoogle, FaLinkedin, FaGithub } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

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
    <Container
      maxWidth="sm"
      className="flex justify-center items-center min-h-screen p-4 "
    >
      <Box
        className="bg-white p-6 rounded-lg w-full shadow-md"
        sx={{ maxWidth: 400 }}
      >
        <Typography
          variant="h5"
          className="mb-2 text-gray-800 font-bold text-center"
        >
          Welcome Back!
        </Typography>
        <Typography
          variant="body1"
          className="mb-8 text-gray-500 text-center"
        >
          Sign in to continue browsing.
        </Typography>

        {/* Sign-In Form */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            className="mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            className="mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="mb-4"
          >
            Sign In
          </Button>
        </form>

        <Typography
          className="text-center text-gray-500 mb-4"
          variant="body2"
        >
          OR
        </Typography>

        {/* Social Sign-In Buttons */}
        <Button
          fullWidth
          variant="outlined"
          startIcon={<FaGoogle className="text-orange-500" />}
          className="mb-3"
          onClick={() => handleSocialSignIn("google")}
        >
          Continue with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<FaLinkedin className="text-blue-500" />}
          className="mb-3"
          onClick={() => handleSocialSignIn("linkedin")}
        >
          Continue with LinkedIn
        </Button>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<FaGithub />}
          className="mb-4"
          onClick={() => handleSocialSignIn("github")}
        >
          Continue with GitHub
        </Button>

        {/* Additional Links */}
        <Typography
          variant="body2"
          className="text-center text-gray-500"
        >
          Don’t have an account?{" "}
          <Link href="/signup">
            <span className="text-blue-500 font-medium cursor-pointer">
              Sign Up
            </span>
          </Link>
        </Typography>
        <Typography
          variant="body2"
          className="text-center mt-2 text-gray-400"
        >
          By signing in, you agree to our{" "}
          <span className="text-black underline cursor-pointer">
            Terms and Policy
          </span>
          .
        </Typography>
      </Box>
    </Container>
  );
};

export default SignIn;
