"use client";

import firebase_app from "../../../config";
import {
  getDoc,
  doc,
  getFirestore,
  DocumentSnapshot,
  FirestoreDataConverter,
} from "firebase/firestore";
import { getAuth, User } from "firebase/auth";

interface UserData {
  [key: string]: {
    stringValue?: string;
    integerValue?: string;
    doubleValue?: number;
    booleanValue?: boolean;
    timestampValue?: string;
    geoPointValue?: {
      latitude: number;
      longitude: number;
    };
    // Add other possible field types as needed
  };
}

const userDataConverter: FirestoreDataConverter<UserData> = {
  toFirestore: (userData: UserData) => userData,
  fromFirestore: (snapshot: DocumentSnapshot) => {
    return snapshot.data()?._document?.data?.value?.mapValue
      ?.fields as UserData;
  },
};

export default async function readUserData(): Promise<UserData | "null"> {
  const db = getFirestore(firebase_app);
  const auth = getAuth(firebase_app);
  const user: User | null = auth.currentUser;

  if (!user) {
    throw new Error("No authenticated user found");
  }

  const userDoc = doc(db, "users", user.uid).withConverter(userDataConverter);
  const docSnap = await getDoc(userDoc);

  if (docSnap.exists()) {
    console.log(docSnap.data());
    return docSnap.data();
  } else {
    return "null";
  }
}
