import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, GoogleLoginRequest } from '../types';

const API_BASE = import.meta.env.VITE_API_URL;
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

const authAPI = {
  googleLogin: async (data: GoogleLoginRequest) => {
    const response = await fetch(`${API_BASE}/auth/google-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Invalid Google token');
    return response.json();
  },

  getMe: async () => {
    const response = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to get user info');
    return response.json();
  },

  logout: async () => {
    const response = await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to logout');
    return response.json();
  }
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  googleLogin: (idToken: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(!!token); // Only load if we have a token
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsLoading(true);
      authAPI.getMe()
        .then(setUser)
        .catch(() => {
          // Clear token if verification fails to prevent redirection/authentication loops
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          setError('Failed to refresh session');
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const googleLogin = async (idToken: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authAPI.googleLogin({ id_token: idToken });
      const newToken = response.token;
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      
      // Fetch user info using the new token
      const userDoc = await authAPI.getMe();
      setUser(userDoc);
    } catch (err) {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      setError('Google login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.warn('Backend logout failed:', error);
    } finally {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      setError(null);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isAuthenticated, 
      isLoading, 
      error, 
      googleLogin, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

