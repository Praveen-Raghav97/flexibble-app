'use client'

import { signIn } from 'next-auth/react';  // NextAuth signIn function
import { Button, TextField, Typography, Box, Container } from '@mui/material';  // Material UI components
import { FaGoogle, FaLinkedin, FaGithub } from 'react-icons/fa';  // Icons from react-icons

const SignUp = () => {
  return (
    <Container maxWidth="lg" className="flex justify-center items-center min-h-screen p-4">
      <Box className="bg-white p-6 shadow-lg rounded-lg  sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-sm ">
        <Typography variant="h6" className="text-start mb-2  text-md sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl">
          Welcome Flex
        </Typography>
        <Typography variant="h5" className="text-start mb-8 text-gray  text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm">
          Signup into flex to continue browsing.
        </Typography>
        {/* Name Input */}
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          className="mb-4"
        />

        {/* Email Input */}
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          className="mb-4"
        />

        {/* Password Input */}
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          className="mb-6"
        />
         <Button
         
         fullWidth
         variant="outlined"
        
         className="mb-4 text-white bg-green-600 hover:bg-green-400 transition-all"
       >
         Continue
       </Button>
  <br />
                 <p className='text-center  mb-1'>OR</p>
        {/* Social Sign Up Buttons */}
        <Button
         
          fullWidth
          variant="outlined"
          startIcon={<FaGoogle className='text-orange-500'/>}
          className="mb-4 text-black border-gray hover:bg-blue-50 transition-all"
        >
          Continue with Google
        </Button>

        <Button
        
          fullWidth
          variant="outlined"
          startIcon={<FaLinkedin className='text-blue-500' />}
          className="mb-4 text-black border-gray hover:bg-blue-50 transition-all"
        >
          Continue with LinkedIn
        </Button>

        <Button
         
          fullWidth
          variant="outlined"
          startIcon={<FaGithub />}
          className="text-black border-gray hover:bg-gray-50 transition-all"
        >
          Continue with GitHub
        </Button>
        <Typography variant="h5" className="text-center mt-8 text-blue-400  text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm cursor-pointer">
          Already have an account ?  <span className='text-blue-500 text-bold underline p-1 cursor-pointer'>Sign In </span>
        </Typography>
        <Typography variant="h5" className="text-center mt-8 text-gray  text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm">
          By Signup in, you agree to <span className='text-black underline  cursor-pointer'>Term and policy</span> .
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUp;
