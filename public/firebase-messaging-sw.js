// Import the functions you need from the Firebase SDK
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

// const firebaseConfig = {
//   apiKey: "AIzaSyB2Eet74YGu7IjTSJKqhDcek_nbu3DbQHY",
//   authDomain: "ajyal-notifications.firebaseapp.com",
//   projectId: "ajyal-notifications",
//   storageBucket: "ajyal-notifications.firebasestorage.app",
//   messagingSenderId: "634664886976",
//   appId: "1:634664886976:web:12511aad0d67b48fa2c325",
//   measurementId: "G-NCH29ZSW7R"
// };

const firebaseConfig = {
  apiKey: "AIzaSyB-31Sl62kLC1MguYq-BUz1_MkfnhwtjG4",
  authDomain: "ajyal-45f04.firebaseapp.com",
  projectId: "ajyal-45f04",
  storageBucket: "ajyal-45f04.firebasestorage.app",
  messagingSenderId: "879406949173",
  appId: "1:879406949173:web:46ad80dd18bbf42c19a27c",
  measurementId: "G-3XRCC5XHC7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging and connect the Service Worker to the app
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png' // يمكنك تغيير الأيقونة هنا
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
