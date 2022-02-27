//Code for adding event on click of notification
self.addEventListener("notificationclick", function (event) {
  let url = event.notification.data;
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({ includeUncontrolled: true, type: "all" })
      .then((windowClients) => {
        // Check if there is already a window/tab open with the target URL
        for (var i = 0; i < windowClients.length; i++) {
          var client = windowClients[i];
          // If so, just focus it.

          if (
            (client.url.includes("mi-mam05") ||
              client.url.includes("localhost")) &&
            "focus" in client
          ) {
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

const messaging = firebase.messaging(app);

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  var notificationTitle = payload.data.title;
  var notificationOptions = {
    body: payload.data.body,
    icon: "https://mi-mam05.netlify.app/pwa-512x512.png",
    data: payload.data.link,
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
