/**
 * API client for Tabby Loyalty
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  // Add auth token if available
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.error || 'An error occurred',
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error', 0, null);
  }
}

export const api = {
  // Product endpoints
  async getProduct(token) {
    return fetchAPI(`/products/${token}`);
  },

  // Auth endpoints
  async sendOTP(phone) {
    return fetchAPI('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    });
  },

  async verifyOTP(phone, otp, productToken) {
    const data = await fetchAPI('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, otp, productToken }),
    });
    
    // Store token
    if (data.token && typeof window !== 'undefined') {
      localStorage.setItem('token', data.token);
    }
    
    return data;
  },

  async logout() {
    await fetchAPI('/user/logout', { method: 'POST' });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  },

  // User endpoints
  async getDashboard() {
    return fetchAPI('/user/dashboard');
  },

  async getWardrobe() {
    return fetchAPI('/user/wardrobe');
  },

  async getPoints(page = 1, limit = 20) {
    return fetchAPI(`/user/points?page=${page}&limit=${limit}`);
  },

  async updateProfile(profileData) {
    return fetchAPI('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};

export default api;

