// components/AuthProvider/AuthProvider.tsx

'use client';

import { checkSession, getMe } from '../../lib/api/clientApi';
import { useAuthStore } from '../../lib/store/authStore';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    state => state.clearIsAuthenticated
  );

  useEffect(() => {
    const fetchUser = async () => {
      // Перевіряємо сесію
      const user = await checkSession();
      if (user) {
        // Якщо сесія валідна — отримуємо користувача
        const me = await getMe();
        if (me) setUser(me);
      } else {
        // Якщо сесія невалідна — чистимо стан
        clearIsAuthenticated();
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return <>{children}</>;
};

export default AuthProvider;