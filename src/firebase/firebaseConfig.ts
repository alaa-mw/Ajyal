// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getToken } from "firebase/messaging";

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
const app = initializeApp(firebaseConfig);
//  بتهيئة خدمة المراسلة
export const messaging = getMessaging(app);


export const getFirebaseToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      const currentToken = await getToken(messaging, 
        { 
        //  vapidKey:"BD68sijOM65cg8gxHiLw4Ls8djznee2X44oIss5EvhcTgA2ll4NUui5ytfyRxa_wyqVrvwdImalT6M4zDDHbzeE",
          vapidKey:"BK0ZefPTNx6y5vZ88ns85JRyT887t_d78uH9qKRIXV903WyBu0Q7iD23rRe361hRS8qBgpwRIJP40RRKpZC8q3k"
         });

      if (currentToken) {
        console.log(currentToken);
        return currentToken;
        // يمكنك إرسال الرمز إلى خادمك هنا
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    } else {
      console.log('Unable to get permission to notify.');
    }
  } catch (err) {
    console.error('An error occurred while retrieving token.', err);
  }
};

// getFirebaseToken();

export const getFcmTokenAsString = () => {
  return getFirebaseToken()
    .then((fcm_token) => {
      // The resolved value (string or null) is passed here
      return fcm_token || '';
    })
    .catch((error) => {
      // In case of an error, we return an empty string
      console.error("Error getting FCM token:", error);
      return '';
    });
};