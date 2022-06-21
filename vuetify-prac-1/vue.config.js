const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      "^/api": {
        target:
          "http://www.mockbin.org/bin/17bcddec-fe4c-4025-9158-226f8b17be54",
        changeOrigin: true,
      },
    },
  },
});
