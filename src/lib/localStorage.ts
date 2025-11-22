const isBrowser = typeof window !== 'undefined';

export const readItem = (key: string): string | null => {
  if (!isBrowser) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const writeItem = (key: string, value: string): void => {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // ignore quota/availability errors in sandbox
  }
};
