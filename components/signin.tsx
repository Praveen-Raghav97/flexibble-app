"use client"

import { signIn } from 'next-auth/react';  // NextAuth signIn function
import { Button, TextField, Typography, Box, Container } from '@mui/material';  // Material UI components
import { FaGoogle, FaLinkedin, FaGithub } from 'react-icons/fa';  // Icons from react-icons
import { useState } from 'react';
import { useRouter } from 'next/router';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false, // Ensure this is false to handle the result manually
      email,
      password,
    });

    console.log("i am res on frontend " + res)

    if (res?.error) {
      // Handle error
      console.error(res.error);
      alert("Failed to login: " + res.error);
    } else {
     
      // On success, redirect to dashboard
      window.location.href = "/";
    }

  };
  return (
    <Container maxWidth="lg" className="flex justify-center items-center min-h-screen p-4">
      <Box className="bg-white p-6  rounded-lg w-full sm:max-w-md md:max-w-md lg:max-w-md xl:max-w-sm ">
        <Typography variant="h6" className="text-start mb-2  text-md sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl">
          Welcome
        </Typography>
        <Typography variant="h5" className="text-start mb-8 text-gray  text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm">
          Continue into flex to continue browsing.
        </Typography>
       <form onSubmit={handleSubmit}>
  {/* Email Input */}
  <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          className="mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
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
         
         fullWidth
         variant="outlined"
        type="submit"
         className="mb-4 text-white bg-green-600 hover:bg-green-400 transition-all"
       >
         Continue
       </Button>
       </form>

      
  <br />
                 <p className='text-center  mb-1'>OR</p>
        {/* Social Sign Up Buttons */}
        <Button
         
          fullWidth
          variant="outlined"
          startIcon={<FaGoogle className='text-orange-500'/>}
          className="mb-4 text-black border-gray hover:bg-blue-50 transition-all"
          onClick={() => signIn("google")}
        >
          Continue with Google
        </Button>

        <Button
        
          fullWidth
          variant="outlined"
          startIcon={<FaLinkedin className='text-blue-500' />}
          className="mb-4 text-black border-gray hover:bg-blue-50 transition-all"
          onClick={() => signIn("linkedin")}
        >
          Continue with LinkedIn
        </Button>

        <Button
         
          fullWidth
          variant="outlined"
          startIcon={<FaGithub />}
          className="text-black border-gray hover:bg-gray-50 transition-all"
          onClick={() => signIn("github")}
        >
          Continue with GitHub
        </Button>
        <Typography variant="h5" className="text-center mt-8 text-blue-400  text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm cursor-pointer">
          Create new  account ?  <span className='text-blue-500 text-bold underline p-1 cursor-pointer'>Sign Up </span>
        </Typography>
        <Typography variant="h5" className="text-center mt-8 text-gray  text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm">
          By Signin in, you agree to <span className='text-black underline  cursor-pointer'>Term and policy</span> .
        </Typography>
      </Box>
    </Container>
  );
};

export default SignIn;
