/**
 * Check if the app is running without real Firebase credentials.
 * When true, all Firebase Firestore/Storage/Auth calls should be skipped
 * and mock data should be used instead.
 */
export function isMockMode(): boolean {
  return (
    !process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "YOUR_API_KEY"
  );
}
