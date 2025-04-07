import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
		  {
			protocol: 'https',
			hostname: 'static.vecteezy.com',
		  },
		  {
			protocol: 'https',
			hostname: 'lh3.googleusercontent.com',
		  },
		  {
			protocol: 'https',
			hostname: 'res.cloudinary.com',
		  },
		  {
			protocol: 'https',
			hostname: 'th.bing.com',
		  }
		]
	  },
}
export default nextConfig

