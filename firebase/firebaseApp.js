import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKER,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};


export const app = initializeApp(clientCredentials);
export const fireDB = getFirestore(app);