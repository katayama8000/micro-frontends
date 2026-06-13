// A tiny framework-agnostic event bus for cross-micro-frontend communication.
//
// It is built on the browser's native CustomEvent API dispatched on `window`,
// so the host and remote apps stay fully decoupled: neither imports the other,
// they only agree on event names and payload shapes (the contract below).
//
// Why `window` and not a module-local EventTarget? Each micro frontend ships its
// own bundle, so a module-level object would be duplicated — one bus per app, and
// they'd never hear each other. `window` is the single object shared by every MFE
// running in the same page, which makes it the natural cross-app channel.
//
// In a real project this contract would live in a shared package imported by every
// micro frontend. Here it is duplicated in each app to keep the sample self-contained.

// The shared contract: event name -> payload type.
export type MfeEvents = {
  // Remote -> Host: fired whenever the remote counter changes.
  'remote:count-changed': { count: number };
  // Host -> Remote: ask the remote to reset its counter.
  'host:reset-count': { reason: string };
};

export function emit<K extends keyof MfeEvents>(type: K, detail: MfeEvents[K]): void {
  window.dispatchEvent(new CustomEvent(type, { detail }));
}

export function on<K extends keyof MfeEvents>(
  type: K,
  handler: (detail: MfeEvents[K]) => void
): () => void {
  const listener = (event: Event) => handler((event as CustomEvent<MfeEvents[K]>).detail);
  window.addEventListener(type, listener as EventListener);
  // Return an unsubscribe function for easy cleanup in React effects.
  return () => window.removeEventListener(type, listener as EventListener);
}
