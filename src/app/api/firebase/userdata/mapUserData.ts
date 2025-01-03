import { User as FirebaseUser } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "NEXT_PUBLIC_FIREBASE_API_KEY",
  authDomain: "NEXT_PUBLIC_FIREBASE_AUTH_DOMAINN",
  projectId: "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface MappedUserData {
  id: string;
  email: string | null;
  token: string;
  name: string | null;
  profilePic: string | null;
}

export default function mapUserData(
  user: FirebaseUser | null
): MappedUserData | null {
  if (!user) {
    return null;
  }

  return {
    id: user.uid,
    email: user.email,
    token: user.refreshToken, // 'refreshToken'
    name: user.displayName,
    profilePic: user.photoURL, // Note: it's 'photoURL', not 'photoUrl'
  };
}
