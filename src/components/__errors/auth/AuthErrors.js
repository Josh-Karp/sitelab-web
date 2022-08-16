export const AuthError = (err) => {
  switch (err.code) {
    case "auth/Invalid-email":
    case "auth/user-disabled":
    case "auth/user-not-found":
      return { message: "Invalid email.", varaint: "error" };
    case "auth/wrong-password":
      return { message: "Invalid password.", varaint: "error" };
    case "auth/too-many-requests":
      return {
        message: "Too many attempts, try again later.",
        varaint: "error",
      };
    case "auth/email-already-in-use":
      return {
        message: "Email already registered.",
        varaint: "error",
      };
    case "auth/popup-closed-by-user":
      return;
    default:
  }
};
