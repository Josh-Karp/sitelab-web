import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "firebase.config";

function createFirebaseApp(firebaseConfig) {
  try {
    return getApp();
  } catch {
    return initializeApp(firebaseConfig);
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
