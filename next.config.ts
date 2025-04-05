import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				//https://static.vecteezy.com
				protocol: 'https',
				hostname: 'static.vecteezy.com',
			},
		],
	},
}
export default nextConfig

