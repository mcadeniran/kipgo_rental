'use client';

import {auth} from '@/app/[locale]/firebase/config';
import {UserProfile} from '@/app/[locale]/models/UserProfile';
import {getUserProfileById} from '@/lib/services/userService';
import {getRentalShopById} from '@/lib/services/rentalService';
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User, UserCredential} from 'firebase/auth';
import React, {useContext, useEffect, useState} from 'react';
import {RentalShop} from '@/app/[locale]/models/RentalShop';

interface AuthContextType {
  currentUser: User | null;
  userDataObj: UserProfile | null;
  rentalDataObj: RentalShop | null;
  role: UserRole | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string, username: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  loading: boolean;
}

type UserRole = "admin" | "user" | "rental";

const AuthContext = React.createContext<AuthContextType | null>(null);

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export function AuthProvider({children}: {children: React.ReactNode;}) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userDataObj, setUserDataObj] = useState<UserProfile | null>(null);
  const [rentalDataObj, setRentalDataObj] = useState<RentalShop | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<UserRole | null>(null);

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signUp(email: string, password: string, username: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setUserDataObj(null);
    setCurrentUser(null);
    setRentalDataObj(null);
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setLoading(true);
        setCurrentUser(user);

        if (!user) {
          setUserDataObj(null);
          setRentalDataObj(null);
          setRole(null);
          return;
        }

        const uid = user.uid;

        // 1️⃣ Check profiles collection first
        const userProfile = await getUserProfileById(uid);

        if (userProfile) {
          setUserDataObj(userProfile);
          setRentalDataObj(null);

          if (userProfile.isAdmin) {
            setRole("admin");
          } else {
            // if isAdmin missing OR false → default to user
            setRole("user");
          }

          return;
        }

        // 2️⃣ If not in profiles, check rentalShops
        const rental = await getRentalShopById(uid);

        if (rental) {
          setUserDataObj(null); // not a profile user
          setRentalDataObj(rental);
          setRole("rental");
          return;
        }

        // 3️⃣ If exists in neither
        setUserDataObj(null);
        setRentalDataObj(null);
        setRole(null);

      } catch (error) {
        console.error(error);
        setUserDataObj(null);
        setRentalDataObj(null);
        setRole(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    userDataObj,
    rentalDataObj,
    role,
    login,
    logout,
    loading,
    signUp
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
