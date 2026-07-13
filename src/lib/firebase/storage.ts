import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { getFirebaseStorage } from "@/lib/firebase/client";

export async function uploadUserFile(
  uid: string,
  path: string,
  file: Blob,
  contentType?: string
): Promise<string> {
  const storageRef = ref(getFirebaseStorage(), `users/${uid}/${path}`);
  const snapshot = await uploadBytes(storageRef, file, contentType ? { contentType } : undefined);
  return getDownloadURL(snapshot.ref);
}

export async function deleteUserFile(uid: string, path: string): Promise<void> {
  const storageRef = ref(getFirebaseStorage(), `users/${uid}/${path}`);
  await deleteObject(storageRef);
}

export function getUserStoragePath(uid: string, path: string): string {
  return `users/${uid}/${path}`;
}
