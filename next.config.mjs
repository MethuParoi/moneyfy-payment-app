/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      //   {
      //     protocol: "https",
      //     hostname: "fakestoreapi.com",
      //     port: "",
      //     pathname: "/img/**",
      //   },
      {
        protocol: "https",
        hostname: "bsqvdcfziwmlpwiksmtt.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/images/**",
      },
      //   {
      //     protocol: "https",
      //     hostname: "lh3.googleusercontent.com",
      //     port: "",
      //     pathname: "/**",
      //   },
    ],
  },
};

export default nextConfig;
