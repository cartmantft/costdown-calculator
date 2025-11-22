export const getEnv = <T = string>(key: string, fallback?: T): T => {
  const value = import.meta.env[key as keyof ImportMetaEnv];
  return (value ?? fallback ?? '') as T;
};
