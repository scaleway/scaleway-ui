const nextConfig = () => {
  const plugins = [
    // eslint-disable-next-line global-require
    require('next-transpile-modules')([
      '@ultraviolet/ui',
      '@ultraviolet/form',
      '@ultraviolet/icons',
      'react-syntax-highlighter',
    ]),
  ]

  /** @type {import('next/dist/server/config').NextConfig} */
  const config = {
    compress: true,
    images: {
      formats: ['image/avif', 'image/webp'],
      loader: 'imgix',
      path: 'https://ultraviolet.scaleway.com',
    },
    poweredByHeader: false,
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
      emotion: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }

  return plugins.reduce((acc, next) => next(acc), config)
}

module.exports = nextConfig()
