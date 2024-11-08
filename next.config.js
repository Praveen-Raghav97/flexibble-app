module.exports = {

  webpack: (config) => {
    config.cache = {
      type: "memory",
    };
    return config;
  },
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com','s3-alpha.figma.com', 'letsenhance.io'],
  
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: '',
        pathname: '/api/portraits/**',
      },
      {
        protocol: 'https',
        hostname: 'yt3.ggpht.com',
        port: '',
        pathname: '/ytc/**',
      },
      {
        protocol: 'https',
        hostname: 'yt3.googleusercontent.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};
