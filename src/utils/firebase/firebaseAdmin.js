import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { firebaseAdminConfig } from "firebase.config";

const options = {
  credential: cert(firebaseAdminConfig),
};

function createFirebaseAdminApp(options) {
  if (getApps().length === 0) {
    return initializeApp(options);
  } else {
    return getApp();
  }
}

const firebaseAdmin = createFirebaseAdminApp(options);
export const adminAuth = getAuth(firebaseAdmin);
