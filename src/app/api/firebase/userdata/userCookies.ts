import Cookies from "js-cookie";
interface User {
  // Define the structure ofq your user object here
  // For example:
  uid: string;
  email: string;
  // Add other properties as needed
}

export const getUserFromCookie = (): User | undefined => {
  const cookie = Cookies.get("auth");
  if (!cookie) {
    return undefined;
  }
  try {
    return JSON.parse(cookie) as User;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const setUserCookie = (user: User): void => {
  Cookies.set("auth", JSON.stringify(user), {
    // firebase id tokens expire in an hour
    // setting cookie expire to match
    expires: 1 / 24,
  });
};

export const removeUserCookie = (): void => Cookies.remove("auth");
