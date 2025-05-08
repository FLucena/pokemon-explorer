const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second
const RATE_LIMIT_DELAY = 5000; // 5 seconds

export const fetchWithRetry = async (url, options = {}, retryCount = 0) => {
  try {
    const response = await fetch(url, options);
    
    if (response.status === 429) {
      if (retryCount < MAX_RETRIES) {
        console.log(`Rate limited. Retrying in ${RATE_LIMIT_DELAY/1000} seconds...`);
        await delay(RATE_LIMIT_DELAY);
        return fetchWithRetry(url, options, retryCount + 1);
      }
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    if (!response.ok) {
      if (retryCount < MAX_RETRIES) {
        console.log(`Request failed. Retrying in ${RETRY_DELAY/1000} seconds...`);
        await delay(RETRY_DELAY);
        return fetchWithRetry(url, options, retryCount + 1);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      console.log(`Request failed. Retrying in ${RETRY_DELAY/1000} seconds...`);
      await delay(RETRY_DELAY);
      return fetchWithRetry(url, options, retryCount + 1);
    }
    throw error;
  }
}; 