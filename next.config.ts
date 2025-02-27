import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  images: {
    domains: [
      'd3le09nbvee0zx.cloudfront.net'  // Add CloudFront domain
    ],
  },
};

export default withNextIntl(nextConfig);
