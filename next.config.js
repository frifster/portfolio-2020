const withLess = require("next-with-less");
// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = withLess({
    /* config options here */
    lessLoaderOptions: {},
})

module.exports = nextConfig