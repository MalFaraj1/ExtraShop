const path = require('path');

module.exports = {
  // Your existing config...
  resolve: {
    fallback: {
      "zlib": require.resolve("browserify-zlib"),
      "querystring": require.resolve("querystring-es3"),
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "stream-http": require.resolve("stream-http"),
      "fs": false,
      "http": require.resolve("stream-http"),
      "net": false,
      "async_hooks": false
    }
  }
};