// Import the functions you need from the Firebase SDK
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

// Replace with your own firebaseConfig
const firebaseConfig = {
  apiKey: "AIzaSyB2Eet74YGu7IjTSJKqhDcek_nbu3DbQHY",
  authDomain: "ajyal-notifications.firebaseapp.com",
  projectId: "ajyal-notifications",
  storageBucket: "ajyal-notifications.firebasestorage.app",
  messagingSenderId: "634664886976",
  appId: "1:634664886976:web:12511aad0d67b48fa2c325",
  measurementId: "G-NCH29ZSW7R"
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
    // icon: '/firebase-logo.png' // يمكنك تغيير الأيقونة هنا
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});