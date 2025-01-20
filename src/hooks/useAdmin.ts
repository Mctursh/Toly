// hooks/useAdmin.ts
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AdminSession {
  token: string;
  expiresAt: number;
}

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    verifySession();
  }, []);

  const verifySession = async () => {
    try {
      const session = getAdminSession();
      if (!session) {
        throw new Error('No session');
      }

      // Call NestJS verify endpoint
      const response = await fetch(`${API_URL}/admin/verify`, {
        headers: {
          'X-Admin-Token': session.token
        }
      });

      if (!response.ok) {
        throw new Error('Invalid session');
      }

      setIsAdmin(true);
    } catch {
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    // Call NestJS login endpoint
    const response = await fetch(`${API_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const { token } = await response.json();

    // Store session
    const session: AdminSession = {
      token,
      expiresAt: Date.now() + 60 * 60 * 1000 // 1 hour
    };
    localStorage.setItem('admin-session', JSON.stringify(session));
    setIsAdmin(true);
    router.push('/admin'); // Redirect to dashboard after successful login
    return token;
  };

  const logout = () => {
    localStorage.removeItem('admin-session');
    setIsAdmin(false);
    router.push('/admin/login');
  };

  return { isAdmin, loading, login, logout };
}

function getAdminSession(): AdminSession | null {
  const session = localStorage.getItem('admin-session');
  if (!session) return null;

  const parsed = JSON.parse(session);
  if (parsed.expiresAt < Date.now()) {
    localStorage.removeItem('admin-session');
    return null;
  }

  return parsed;
}