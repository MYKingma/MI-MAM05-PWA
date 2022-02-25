import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

const firebaseConfig = {
  apiKey: "AIzaSyBEMVdOJ5nrGwKdRFSJn7_uob7hFDr1luc",
  authDomain: "mi-mam05-pwa.firebaseapp.com",
  projectId: "mi-mam05-pwa",
  storageBucket: "mi-mam05-pwa.appspot.com",
  messagingSenderId: "588595241360",
  appId: "1:588595241360:web:3481eff01d860fa20f5315",
  measurementId: "G-PNLPZ384M8",
};

const app = initializeApp(firebaseConfig);

app
  .messaging()
  .getToken({
    vapidKey:
      "BBP2ovYHYAJxmRGuY10yQy3u6Cztlmm7TfWKYBoEDB61MWfu_QAAeIrLgVMxF3krQZ43h0VKSFuLyI_6OjS89BI",
  })
  .then((currentToken) => {
    if (currentToken) {
      console.log("client token", currentToken);
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
  });

const messaging = getMessaging(app);

onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
