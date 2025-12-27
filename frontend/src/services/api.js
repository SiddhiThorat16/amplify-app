// frontend/src/services/api.js

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const request = async (path, options = {}) => {
  const { isFormData, retry = 1, ...rest } = options;
  const headers = new Headers();
  
  if (!isFormData) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(BASE_URL + path, {
    credentials: 'include',
    headers,
    ...rest,
  });

  const contentType = res.headers.get('content-type') || '';

  if (!res.ok) {
    if (contentType.includes('application/json')) {
      const errData = await res.json();
      throw new Error(errData.error || 'Request failed');
    } else {
      const text = await res.text();
      throw new Error(text || 'Request failed');
    }
  }

  if (contentType.includes('application/json')) {
    return res.json();
  }
  return res.text();
};

// Bonus: requestWithRetry (keeps original logic + retry)
export const requestWithRetry = async (path, options = {}) => {
  const maxRetries = options.retry || 2;
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await request(path, { ...options, retry: maxRetries - i });
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }
  
  throw lastError;
};
