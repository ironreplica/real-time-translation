// import Cookies from "@types/js-cookie";
// TODO: Convert to typescript
import cookies from "js-cookie";

export const getUserFromCookie = () => {
  const cookie = cookies.get("auth");
  if (!cookie) {
    return;
  }
  try {
    return JSON.parse(cookie);
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const setUserCookie = (token) => {
  console.log("Set cookie: " + token);
  cookies.set("auth", token, {
    expires: 1 / 24,
    sameSite: "strict", // or 'lax'
    secure: true, // Ensure the cookie is only sent over HTTPS
  });
};
export const removeUserCookie = () => cookies.remove("auth");
