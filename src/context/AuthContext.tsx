"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Role = "student" | "teacher" | "parent" | "admin";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: Role;
  createdAt?: any;
  profileData?: Record<string, any>;
}

interface AuthContextType {
  user: any;
  profile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  login: async () => { },
  logout: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("clazo-user");

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setProfile(parsedUser);
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const fakeUser: UserProfile = {
      uid: "demo-user",
      name: email.split("@")[0],
      email,
      role: email.includes("admin")
        ? "admin"
        : email.includes("teacher")
          ? "teacher"
          : email.includes("parent")
            ? "parent"
            : "student",
      profileData: {},
    };

    localStorage.setItem("clazo-user", JSON.stringify(fakeUser));

    setUser(fakeUser);
    setProfile(fakeUser);

    return fakeUser;
  };

  const logout = async () => {
    localStorage.removeItem("clazo-user");
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};