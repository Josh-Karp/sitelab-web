import {
    cert,
    getApp,
    getApps,
    initializeApp,
  } from "firebase-admin/app";
  import { getAuth } from "firebase-admin/auth";
  
  const credentials = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  };
  
  const options = {
    credential: cert(credentials),
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