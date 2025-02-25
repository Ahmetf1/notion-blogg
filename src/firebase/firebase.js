import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyDXQ6xlHHSk82-m3UDnA7HPMZ4SdYxMC8U",
    authDomain: "myblog-70da8.firebaseapp.com",
    projectId: "myblog-70da8",
    storageBucket: "myblog-70da8.firebasestorage.app",
    messagingSenderId: "379639522588",
    appId: "1:379639522588:web:020226b021fc23783046d9",
    measurementId: "G-M8THGWM8CX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics conditionally
let analytics = null;

// Only initialize analytics on the client side
if (typeof window !== 'undefined') {
  isSupported().then(yes => {
    if (yes) {
      analytics = getAnalytics(app);
      
      if (process.env.NODE_ENV === 'development') {
        // Enable analytics debugging
        window.localStorage.setItem('debug', 'firebase:*');
      }
    }
  });
}

export { analytics }; 