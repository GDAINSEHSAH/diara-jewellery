"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (data: { name?: string; email?: string; phone?: string }) => void;
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, address: Omit<Address, "id">) => void;
  deleteAddress: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "diara-auth";
const USERS_KEY = "diara-users";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        // Also update in users list
        const users = getUsers();
        const idx = users.findIndex((u) => u.user.id === user.id);
        if (idx >= 0) {
          users[idx] = { ...users[idx], user };
          localStorage.setItem(USERS_KEY, JSON.stringify(users));
        }
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [user, loaded]);

  const getUsers = (): Array<{ email: string; password: string; user: User }> => {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    } catch {
      return [];
    }
  };

  const login = (email: string, password: string): boolean => {
    const users = getUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (found) {
      setUser(found.user);
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string): boolean => {
    const users = getUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return false;
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone: "",
      addresses: [],
      createdAt: new Date().toISOString(),
    };
    users.push({ email, password, user: newUser });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: { name?: string; email?: string; phone?: string }) => {
    if (!user) return;
    setUser({ ...user, ...data });
  };

  const addAddress = (address: Omit<Address, "id">) => {
    if (!user) return;
    const newAddress: Address = { ...address, id: `addr-${Date.now()}` };
    const addresses = address.isDefault
      ? user.addresses.map((a) => ({ ...a, isDefault: false }))
      : [...user.addresses];
    setUser({ ...user, addresses: [...addresses, newAddress] });
  };

  const updateAddress = (id: string, address: Omit<Address, "id">) => {
    if (!user) return;
    let addresses = user.addresses.map((a) =>
      a.id === id ? { ...address, id } : a
    );
    if (address.isDefault) {
      addresses = addresses.map((a) =>
        a.id === id ? a : { ...a, isDefault: false }
      );
    }
    setUser({ ...user, addresses });
  };

  const deleteAddress = (id: string) => {
    if (!user) return;
    setUser({ ...user, addresses: user.addresses.filter((a) => a.id !== id) });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        signup,
        logout,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
