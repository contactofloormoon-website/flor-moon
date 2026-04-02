/** @type {import('next').NextConfig} */
const nextConfig = {
eslint: {
ignoreDuringBuilds: true,
},
typescript: {
ignoreBuildErrors: true,
},
webpack: (config: any, { isServer }: any) => {
if (!isServer) {
config.cache = false;
}
return config;
},
};

export default nextConfig;