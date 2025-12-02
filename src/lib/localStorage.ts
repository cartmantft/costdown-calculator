const isBrowser = typeof window !== 'undefined';

// 단일 스토리지 키 소스: 히스토리/통화 저장 시 여기를 기준으로 사용한다.
export const storageKeys = {
  history: 'dca:history',
  lastCurrency: 'dca:lastCurrency',
};

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
