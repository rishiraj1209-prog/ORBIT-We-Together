import { FirebaseError } from "firebase/app";

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/user-disabled": "This account has been disabled. Contact support.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/invalid-credential": "Invalid email or password.",
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/weak-password": "Password must be at least 8 characters with letters and numbers.",
  "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
  "auth/popup-closed-by-user": "Sign-in was cancelled.",
  "auth/popup-blocked": "Pop-up was blocked. Allow pop-ups and try again.",
  "auth/network-request-failed": "Network error. Check your connection and retry.",
  "auth/operation-not-allowed": "This sign-in method is not enabled.",
  "auth/requires-recent-login": "Please sign in again to continue.",
  "auth/invalid-college-email":
    "Please use your official college email address to join Orbit.",
};

export function mapFirebaseAuthError(error: unknown): string {
  if (error instanceof FirebaseError) {
    return AUTH_ERROR_MESSAGES[error.code] ?? "Something went wrong. Please try again.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

export function getAuthErrorCode(error: unknown): string {
  if (error instanceof FirebaseError) {
    return error.code;
  }
  return "auth/unknown";
}
