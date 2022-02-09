import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { initializeApp } from "firebase/app";

const app = createApp(App);

const firebaseConfig = {
  apiKey: "AIzaSyBEMVdOJ5nrGwKdRFSJn7_uob7hFDr1luc",
  authDomain: "mi-mam05-pwa.firebaseapp.com",
  projectId: "mi-mam05-pwa",
  storageBucket: "mi-mam05-pwa.appspot.com",
  messagingSenderId: "588595241360",
  appId: "1:588595241360:web:3481eff01d860fa20f5315",
  measurementId: "G-PNLPZ384M8",
};

// Initialize Firebase
initializeApp(firebaseConfig);

app.use(router);

app.mount("#app");
