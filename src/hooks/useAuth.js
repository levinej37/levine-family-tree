import { useState, useCallback } from 'react';

const PASSCODE = import.meta.env.VITE_FAMILY_PASSCODE || 'LevineFamilyTree2024';
const SESSION_KEY = 'levine_tree_auth';

export function useAuth() {
  const [isEditor, setIsEditor] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [error, setError] = useState('');

  const login = useCallback((code) => {
    if (code.trim() === PASSCODE) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setIsEditor(true);
      setError('');
      return true;
    } else {
      setError('Incorrect passcode. Please try again.');
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsEditor(false);
  }, []);

  return { isEditor, login, logout, error, setError };
}
