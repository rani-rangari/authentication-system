import { createContext, useEffect, useState, type ReactNode } from 'react';
import { authService } from '../api/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string } | null;
  login: (data: any) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}


export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);
  
  useEffect(() => {
    const handleCrossTabAuth = (event: StorageEvent) => {
      // The storage event only fires across OTHER tabs when localStorage is mutated
      if (event.key === 'token') {
        if (!event.newValue) {
          // Token was cleared elsewhere (e.g., Logout in Tab A)
          setIsAuthenticated(false);
          setUser(null);
        } else {
          // Token was updated/set elsewhere (e.g., Login in Tab A)
          setIsAuthenticated(true);
        }
      }
    };

    window.addEventListener('storage', handleCrossTabAuth);
    return () => window.removeEventListener('storage', handleCrossTabAuth);
  }, []);
  
  const login = async (data: any) => {
    setLoading(true);
    try {
      const res = await authService.login(data);
      localStorage.setItem('token', res.token);
      setUser({ name: res.fullName });
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data: any) => {
    setLoading(true);
    try {
      const res = await authService.signup(data);
      localStorage.setItem('token', res.token);
      setUser({ name: res.fullName });
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signup, logout, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
};