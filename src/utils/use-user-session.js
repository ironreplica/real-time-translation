// import { useState, useEffect } from "react";
// import { getUserSession } from "./get-user-session";

// export function useUserSession() {
//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchSession() {
//       try {
//         const userSession = await getUserSession();
//         setSession(userSession);
//       } catch (error) {
//         console.error("Error fetching user session:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchSession();
//   }, []);

//   return { session, loading };
// }
