import RealtimeMapTest from "../sandbox/RealtimeMapTest";

/**
 * TEMP TEST MODE
 * ----------------
 * This bypasses routing and directly renders
 * the realtime stub map for verification.
 *
 * ⚠️ IMPORTANT:
 * After testing, restore your original App.jsx
 */

export default function App() {
  return <RealtimeMapTest />;
}