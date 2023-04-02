// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  ssr: false,
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/index.scss";',
        },
      },
    },
  },
  css: ["normalize.css"],
  runtimeConfig: {
    public: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || "",
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN || "",
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || "",
      VUE_APP_APPLICATION_ID: process.env.VUE_APP_APPLICATION_ID || ""
    },
  },
};
