'use client';
import { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";

type AuthCtx = {
  user: User | null;
  login: (email: string, pw: string) => Promise<void>;
  signup: (email: string, pw: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  const login = (email: string, pw: string) =>
    signInWithEmailAndPassword(auth, email, pw).then(() => undefined);
  const signup = (email: string, pw: string) =>
    createUserWithEmailAndPassword(auth, email, pw).then(() => undefined);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
