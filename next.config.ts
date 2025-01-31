import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname:"lh3.googleusercontent.com",
        pathname:"**",
      },
      {
        protocol: "https",
        hostname:"avatars.githubusercontent.com",
        pathname:"**",
      },
      {
        protocol: "https",
        hostname:"static-00.iconduck.com",
        pathname:"**",
      },
      {
        protocol: "https",
        hostname:"res.cloudinary.com",
        pathname:"**",
      }
    ]
  }
};

export default nextConfig;
