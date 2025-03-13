// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxtjs/i18n",
  ],

  css: ["~/assets/css/main.css"],

  colorMode: {
    storageKey: "my-app-color-mode",
  },

  i18n: {
    lazy: true,
    strategy: 'no_prefix',
    locales: [
      {
        code: "en",
        name: "English",
      },
      {
        code: "fr",
        name: "Français",
      },
    ],
    vueI18n: '../i18n.config.ts'
  },

  icon: {
    customCollections: [{
      prefix: 'custom',
      dir: 'app/assets/icons'
    }]
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-11-27",
});
