const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "^/api": {
        target:
          "http://www.mockbin.org/bin/c80b8c90-22de-4562-a5e5-2f44f0f14b38",
        changeOrigin: true,
      },
    },
  },
});
