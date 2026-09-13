import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "thecontext-uploads.s3.eu-north-1.amazonaws.com" },
    ],
    // On networks that resolve hosts via NAT64 (IPv6-mapped IPv4), Next's SSRF
    // guard sees the 64:ff9b::/96-prefixed address and flags it as "private"
    // even though it decodes to a real public IP. Safe here since image sources
    // are already restricted to the exact hostnames allowlisted above.
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
