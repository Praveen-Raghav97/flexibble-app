'use client'

import { signIn } from 'next-auth/react'; // NextAuth signIn function
import { Button, TextField, Typography, Box, Container } from '@mui/material'; // Material UI components
import { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: null,
  });

  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      if (files && files[0]) {
        setFormData((prevData: any) => ({
          ...prevData,
          image: files[0],
        }));
        setFilePreview(URL.createObjectURL(files[0])); // Set the preview URL
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData, ' i am data');
  };

  return (
    <Container maxWidth="sm" className="flex justify-center items-center min-h-screen p-4">
      <Box
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 2,
          width: '100%',
          maxWidth: { xs: '100%', sm: '500px' },
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" textAlign="center" sx={{ mb: 1 }}>
          Welcome
        </Typography>
        <Typography variant="body2" textAlign="center" sx={{ mb: 4, color: 'gray' }}>
          Signup into Flex to continue browsing.
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={formData.name}
            required
            onChange={handleChange}
          />

          {/* Email Input */}
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={formData.email}
            required
            onChange={handleChange}
          />

          {/* Password Input */}
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            sx={{ mb: 3 }}
            value={formData.password}
            required
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mb: 2,
              bgcolor: 'green.600',
              color: 'white',
              '&:hover': { bgcolor: 'green.400' },
            }}
          >
            Continue
          </Button>
        </form>

        <Typography textAlign="center" sx={{ my: 2 }}>
          OR
        </Typography>

        {/* Image Upload Field */}
        <label htmlFor="image-upload">
          <Typography variant="body2" sx={{ mb: 1, textAlign: 'center' }}>
            Profile Image
          </Typography>
          <input
            id="image-upload"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
          <Button
            variant="outlined"
            component="span"
            fullWidth
            onClick={() => document.getElementById('image-upload')?.click()}
          >
            Choose File
          </Button>
        </label>

        {filePreview && (
          <Box mt={2} display="flex" justifyContent="center">
            <img
              src={filePreview}
              alt="Preview"
              style={{
                maxWidth: '100%',
                height: 'auto',
                width: '100%',
                maxWidth: '400px',
                borderRadius: '10px',
              }}
            />
          </Box>
        )}

        <Typography
          variant="body2"
          textAlign="center"
          sx={{
            mt: 4,
            color: 'blue.400',
            '& span': { color: 'blue.500', fontWeight: 'bold', textDecoration: 'underline' },
            cursor: 'pointer',
          }}
        >
          Already have an account? <span>Sign In</span>
        </Typography>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{
            mt: 2,
            color: 'gray',
            '& span': { color: 'black', textDecoration: 'underline', cursor: 'pointer' },
          }}
        >
          By signing up, you agree to our <span>Terms and Policy</span>.
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUp;
