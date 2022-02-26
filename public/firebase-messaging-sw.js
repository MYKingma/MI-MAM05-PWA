importScripts("https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyBEMVdOJ5nrGwKdRFSJn7_uob7hFDr1luc",
  authDomain: "mi-mam05-pwa.firebaseapp.com",
  projectId: "mi-mam05-pwa",
  storageBucket: "mi-mam05-pwa.appspot.com",
  messagingSenderId: "588595241360",
  appId: "1:588595241360:web:3481eff01d860fa20f5315",
  measurementId: "G-PNLPZ384M8",
};

const app = firebase.initializeApp(firebaseConfig);

// app
//   .messaging()
//   .getToken({
//     vapidKey:
//       "BBP2ovYHYAJxmRGuY10yQy3u6Cztlmm7TfWKYBoEDB61MWfu_QAAeIrLgVMxF3krQZ43h0VKSFuLyI_6OjS89BI",
//   })
//   .then((currentToken) => {
//     if (currentToken) {
//       console.log("client token", currentToken);
//     } else {
//       console.log(
//         "No registration token available. Request permission to generate one."
//       );
//     }
//   })
//   .catch((err) => {
//     console.log("An error occurred while retrieving token. ", err);
//   });

const messaging = firebase.messaging(app);

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  var notification = payload.notification;
  var notificationTitle = notification.title;
  var notificationOptions = {
    body: notification.body,
    icon: "/pwa-512x512.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

//Code for adding event on click of notification
self.addEventListener("notificationclick", function (event) {
  let url = event.notification.data.url;
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        // If so, just focus it.
        if (client.url.contains("mi-mam05") && "focus" in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
