import { createApp } from "vue";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import App from "./App.vue";
import router from "./router";
import store from "./store";

if (
  "serviceWorker" in navigator &&
  (window.location.href.includes("localhost:5050") ||
    window.location.href.includes("netlify.app"))
) {
  if (!navigator.serviceWorker.controller) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js");
    });
  }
}

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

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();
enableIndexedDbPersistence(db);

auth.onAuthStateChanged((user) => {
  store.dispatch("fetchUser", user);
});

app.component("IconWrapper", FontAwesomeIcon);
app.use(router);
app.use(store);

app.mount("#app");

export { db, auth, storage };
