// 0. If using a module system, call Vue.use(VueRouter)

// 1. Define route components.
// These can be imported from other files
const User = { template: '<b>User {{ $route.params.id }}</b>'  }
const NotFound = { template: '<b>Not sure? {{ $route.params }}</b>'  }

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: homeComponent },
  { path: '/schedule', component: scheduleComponent },
  { path: '/weather', component: weatherComponent },
  { path: '/crypto/:id', component: cryptoComponent },
  { path: '*', component: NotFound }
]

// 2.1 using i18n
// Ready translated locale messages
const messages = {
  en: en,
  es: es,
}
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
})

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  i18n, router,
  methods: {
      setLanguage: function (code) {
        i18n.locale = code;
      },
    }
  },
).$mount('#app')