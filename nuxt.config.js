export default {
  server: {
	  host: '0.0.0.0',
    port: 8085
  },
  ssr: false,

  head: {
    titleTemplate: '%s',
    title: 'Intellify',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    '@/assets/css/portal.css',
    'vue2-timepicker/dist/VueTimepicker.css',
  ],

  plugins: [
    '~/plugin/CKEditor',
    '~/plugin/datePicker',
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module',
  ],

  modules: [
    'nuxtjs-mdi-font',
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    '@nuxtjs/toast',
  ],

  toast: {
    position: 'top-right',
    duration: 3000,
    theme: 'outline',
    className: 'toast-font'
  },

  axios: {
    baseURL: 'https://hadiahadi.pythonanywhere.com/',
    // baseURL: 'http://127.0.0.1:656',
  },

  vuetify: {
    treeShake: true,
    defaultAssets: false,
    customVariables: ['~/assets/variables.scss'],
  },

  build: {
    transpile: ['vuetify/lib'],
  },
}
