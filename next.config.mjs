/** @type {import('next').NextConfig} */
const nextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				pathname: '/a/**',
			},
			{
				protocol: 'https',
				hostname: 'i.ibb.co.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'i.ibb.co',
				pathname: '/**',
			},
		],
	},
	reactCompiler: true,
};

export default nextConfig;
