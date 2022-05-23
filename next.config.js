const { i18n } = require('./next-i18next.config')

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  }
]

module.exports = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*{/}?',
        headers: securityHeaders,
      },
    ]
  },
  esModule: true,
  i18n:i18n,
  //  {
  //   defaultLocale: 'en',
  //   localeDetection: false,
  //   browserLanguageDetection: false,
  //   serverLanguageDetection: false,
  //   locales: ["en", "de", "ar", "fr", "hi", "pl"],
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
}