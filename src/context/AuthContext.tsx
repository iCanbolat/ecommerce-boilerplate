'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../utils/supabase/client';
import { User } from '@supabase/supabase-js';

const Context = createContext<any>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>();
  const [id, setId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null | undefined>(null);
  const [name, setName] = useState<any>(null);
  const [picture, setPicture] = useState<string | null>(null);

  const supabaseClient = createClient();

  const getCurrentSession = async () => {
    const res = await supabaseClient.auth.getSession();
    if (res && res.data.session) {
      return res.data.session;
    }
    clearUser();
    return null;
  };

  const getCurrentUser = async () => {
    if (id) return;

    const res = await supabaseClient.auth.getUser();
    if (res && res.data.user) {
      const theUser = res.data.user;
      console.log(theUser);

      setUser(theUser);
      setId(theUser.id);
      setEmail(theUser?.email);
      setName(theUser?.user_metadata.full_name ?? '');
      setPicture(theUser?.user_metadata.avatar_url);
    }
  };

  useEffect(() => {
    const isUser = async () => {
      const currentSession = await getCurrentSession();
      if (currentSession) await getCurrentUser();
    };
    isUser();
  }, []);

  const signOut = async () => {
    await supabaseClient.auth.signOut();
    clearUser();
    router.push('/');
  };

  const clearUser = () => {
    setUser(null);
    setId(null);
    setEmail(null);
    setName(null);
    setPicture(null);
  };

  const exposed = { user, id, email, name, picture, signOut };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => useContext(Context);

export default AuthProvider;
