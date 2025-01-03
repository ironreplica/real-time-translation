"use client";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const createToFirestore = async (
  userDisplayName: string,
  uid: string
): Promise<void> => {
  const db = getFirestore();
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  try {
    console.log("creating user data document");
    const userDoc = doc(db, "users", uid);
    await setDoc(userDoc, {
      biography: "Empty biography, tell us something about yourself!",
      contact_email: "contact-email@noreply.com",
      followed_users: [],
      followers_array: [],
      categories: [],
      time_stamp: `${month}/${day}/${year}`,
      profileURL:
        "https://firebasestorage.googleapis.com/v0/b/game-dev-diaries.appspot.com/o/files%2Fblank-profile.png?alt=media&token=720a666a-3218-4650-8cfe-c17127bbf28a",
      username: userDisplayName,
    });
    console.log("complete!");
  } catch (error) {
    console.log(error);
  }
};

export const followUser = async (uid: string): Promise<void> => {
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("No user is signed in.");
    return;
  }

  try {
    const userDoc = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDoc);

    if (!docSnap.exists()) {
      console.error("User document does not exist.");
      return;
    }

    const curFollowedUsers = docSnap.data()?.followed_users || [];
    if (!curFollowedUsers.includes(uid)) {
      curFollowedUsers.push(uid);
      await updateDoc(userDoc, { followed_users: curFollowedUsers });
      console.log("User followed:", uid);
    } else {
      console.log("User is already followed.");
    }
  } catch (error) {
    console.log(error);
  }
};

export const writeToFirestore = async (
  bio?: string,
  profilePicURL?: string,
  following?: string[],
  contactEmail?: string,
  categoryTags?: string[],
  followers?: string[]
): Promise<void> => {
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("No user is signed in.");
    return;
  }

  bio = bio || "Empty Bio...";
  profilePicURL = profilePicURL || user.photoURL || "";
  contactEmail = contactEmail || "No Contact";
  following = following || [];
  categoryTags = categoryTags || [];
  followers = followers || [];

  try {
    console.log("sending data...");
    const userDoc = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      const newData = {
        biography: bio,
        contact_email: contactEmail,
        followed_users: following,
        followers_array: followers,
        categories: categoryTags,
        profileURL: profilePicURL,
      };
      await updateDoc(userDoc, newData);
      console.log("Profile updated:", newData);
    } else {
      console.error("User document does not exist.");
    }
  } catch (error) {
    console.log(error);
  }
};
