// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getToken } from "firebase/messaging";

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
const app = initializeApp(firebaseConfig);
//  بتهيئة خدمة المراسلة
export const messaging = getMessaging(app);


export const getFirebaseToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      const currentToken = await getToken(messaging, 
        { vapidKey:"BPlFjXEN_Y-F_6iF1roodSTpunkkY6kgilzMva33GSREbcNsdFxkYHH2c6OV924RXPrHrT6TJs0tDTYX_AqAhFY"
         });

      if (currentToken) {
        console.log(currentToken);
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