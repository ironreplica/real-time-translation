import firebase_app from "../../../config";
import { getAuth, updateProfile, User } from "firebase/auth";
import { writeToFirestore } from "./addUserData";

const auth = getAuth(firebase_app);

// * This function should never return anything.
export default async function updateUserData(
  profilePic?: string,
  bio?: string,
  tags?: string[]
): Promise<void> {
  if (auth.currentUser === null) return;

  const currentUser: User = auth.currentUser;

  console.log(bio);

  try {
    if (profilePic) {
      await updateProfile(currentUser, {
        photoURL: profilePic,
      });
      console.log("Profile pic updated: " + currentUser.photoURL);
    }
  } catch (error) {
    console.error("Error updating profile picture:", error);
  }

  if (bio) {
    console.log("Updating bio...");
    try {
      await writeToFirestore(bio, profilePic)
        .then(() => {
          console.log("Profile updated successfully");
        })
        .catch((error: Error) => {
          console.error("Error updating Firestore:", error);
        });
    } catch (error) {
      console.error("Error in writeToFirstore:", error);
    }
  }

  // * Add / Delete tags from userdata if necessary
  if (tags) {
    // Implement tags update logic if needed
    console.log("Updating tags...");
  }
}
