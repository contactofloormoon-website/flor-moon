/** @type {import('next').NextConfig} */
const nextConfig = {
eslint: {
ignoreDuringBuilds: true,
},
typescript: {
ignoreBuildErrors: true,
},
webpack: (config: any) => {
return config;
},
};

export default nextConfig;