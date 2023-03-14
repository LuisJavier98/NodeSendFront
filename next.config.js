/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    backendURL: 'http://nodesendback-production.up.railway.app',
    frontendURL: 'https://joyful-bonbon-5a23d4.netlify.app/'
  }
}

module.exports = nextConfig
