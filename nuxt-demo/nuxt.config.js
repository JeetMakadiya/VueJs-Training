export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nuxt-demo",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  // plugins: [],
  plugins: [{ src: "~/plugins/vee-validate.js", ssr: true }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/composition-api/module"],

  ssr: true,
  target: "server",
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "bootstrap-vue/nuxt",
    "cookie-universal-nuxt",
    // "jwt_decode",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  // build: {},
  build: {
    // transpile: ['vee-validate']
    transpile: ["vee-validate/dist/rules"],
  },

  axios: { proxy: true },
  proxy: {
    "/api": {
      target: "http://www.mockbin.org/bin/17bcddec-fe4c-4025-9158-226f8b17be54",
      changeOrigin: true,
    },
  },
};
