// TODO: Convert to typescript, type checking and error handling would be very useful here.
export default function mapUserData(user) {
  const { uid, email, xa, displayName, photoUrl } = user;
  console.log("Mapping data for user: ", user);
  return {
    id: uid,
    email,
    token: xa,
    name: displayName,
    profilePic: photoUrl,
  };
}
