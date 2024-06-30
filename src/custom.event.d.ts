// src/custom-event.d.ts
interface CustomWindowEventMap extends WindowEventMap {
  loggedin: CustomEvent;
}

declare global {
  interface Window {
    addEventListener<K extends keyof CustomWindowEventMap>(
      type: K,
      listener: (this: Window, ev: CustomWindowEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions
    ): void;

    removeEventListener<K extends keyof CustomWindowEventMap>(
      type: K,
      listener: (this: Window, ev: CustomWindowEventMap[K]) => any,
      options?: boolean | EventListenerOptions
    ): void;
  }
}
