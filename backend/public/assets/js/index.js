import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8iIMOFPRt3w9h5BDz0LVkf56610REXt8",
  authDomain: "magic-life-ef965.firebaseapp.com",
  projectId: "magic-life-ef965",
  storageBucket: "magic-life-ef965.appspot.com",
  messagingSenderId: "651047223103",
  appId: "1:651047223103:web:913a32266d8f8553601d8a",
  measurementId: "G-GC674FZFSG",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
auth.languageCode = "uz";

window.recaptchaVerifier = new RecaptchaVerifier(
  "sign-in-button",
  {
    size: "invisible",
    callback: (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      onSignInSubmit();
    },
  },
  auth
);

const phoneNumber = "935747191";

const appVerifier = window.recaptchaVerifier;

signInWithPhoneNumber(auth, phoneNumber, appVerifier)
  .then((confirmationResult) => {
    // SMS sent. Prompt user to type the code from the message, then sign the
    // user in with confirmationResult.confirm(code).
    window.confirmationResult = confirmationResult;
    // ...
  })
  .catch((error) => {
    // Error; SMS not sent
    // ...
  });
