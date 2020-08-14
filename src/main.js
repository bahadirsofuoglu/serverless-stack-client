import Vue from "vue";
import App from "./App.vue";
import { Amplify } from "aws-amplify";
import Vuex from "vuex";
import router from "./router";
import config from "./config";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuex);

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: "notes",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
});
const store = new Vuex.Store({
  state: {
    userHasAuthenticated: false,
    isAuthenticated: false,
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  },
  getters: {
    userHasAuthenticated: (state) => {
      return `${state.userHasAuthenticated}`;
    },
  },
  mutations: {
    changeValue(state, payload) {
      state.userHasAuthenticated = payload;
    },
  },
  actions: {
    changeValue({ commit }, payload) {
      commit("changeValue", payload);
    },
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
