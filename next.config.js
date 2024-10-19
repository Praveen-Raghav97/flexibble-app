// next.config.js


module.exports = {
  reactStrictMode: true,
  images: {
    
      domains: ['s3-alpha.figma.com'],
    
      domains: ['letsenhance.io'], // Add other domains if necessary
      domains: ['res.cloudinary.com', 'letsenhance.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
};

