import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { isCollegeEmail } from "@/lib/constants/auth";
import { mapFirebaseAuthError } from "@/lib/auth/errors";
import { isFirebaseConfigured } from "@/lib/firebase/config";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

async function establishSession(idToken: string): Promise<void> {
  const response = await fetch("/api/auth/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      throw new Error(`Authentication service returned an unexpected response (${response.status}).`);
    }
    const data = (await response.json()) as { error?: string };
    throw new Error(data.error ?? "Failed to establish session.");
  }
}

function assertCollegeEmail(email: string): void {
  if (!isCollegeEmail(email)) {
    throw new Error("Please use your official college email address.");
  }
}

export async function signInWithGoogle(): Promise<User> {
  const auth = getFirebaseAuth();
  const result = await signInWithPopup(auth, googleProvider);
  const email = result.user.email;

  if (!email) {
    await firebaseSignOut(auth);
    throw new Error("Google account must have an email address.");
  }

  assertCollegeEmail(email);

  const idToken = await result.user.getIdToken(true);
  await establishSession(idToken);

  return result.user;
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
  assertCollegeEmail(email);

  const auth = getFirebaseAuth();
  const result = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await result.user.getIdToken(true);
  await establishSession(idToken);

  return result.user;
}

export async function signUpWithEmail(
  email: string,
  password: string
): Promise<User> {
  assertCollegeEmail(email);

  const auth = getFirebaseAuth();
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(result.user);
  const idToken = await result.user.getIdToken(true);
  await establishSession(idToken);

  return result.user;
}

export async function sendPasswordReset(email: string): Promise<void> {
  assertCollegeEmail(email);
  await sendPasswordResetEmail(getFirebaseAuth(), email);
}

export async function resendVerificationEmail(): Promise<void> {
  const user = getFirebaseAuth().currentUser;
  if (!user) {
    throw new Error("You must be signed in to resend verification.");
  }
  await sendEmailVerification(user);
}

export async function signOut(): Promise<void> {
  await fetch("/api/auth/session", { method: "DELETE" });
  if (isFirebaseConfigured()) await firebaseSignOut(getFirebaseAuth());
}

export async function refreshSession(): Promise<void> {
  const auth = getFirebaseAuth();
  const user = auth.currentUser;
  if (!user) return;
  await user.reload();
  const idToken = await user.getIdToken(true);
  await establishSession(idToken);
}

export { mapFirebaseAuthError };
