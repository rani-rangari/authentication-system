import { createContext, useState,  type ReactNode } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

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
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signup, logout, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
};
