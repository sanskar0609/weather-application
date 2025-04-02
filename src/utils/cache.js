const CACHE_PREFIX = 'weather_app_';
const CACHE_EXPIRATION = 30 * 60 * 1000; // 30 minutes in milliseconds

export const cacheData = (key, data) => {
  const cacheItem = {
    data,
    timestamp: new Date().getTime(),
  };
  localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(cacheItem));
};

export const getCachedData = (key) => {
  const cachedItem = localStorage.getItem(`${CACHE_PREFIX}${key}`);
  if (!cachedItem) return null;

  const { data, timestamp } = JSON.parse(cachedItem);
  const now = new Date().getTime();

  if (now - timestamp > CACHE_EXPIRATION) {
    localStorage.removeItem(`${CACHE_PREFIX}${key}`);
    return null;
  }

  return data;
};