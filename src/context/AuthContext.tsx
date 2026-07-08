'use client';

import {auth} from '@/app/[locale]/firebase/config';
import {UserProfile} from '@/app/[locale]/models/UserProfile';
import {createUserProfile, getUserProfileById, markUserEmailVerified} from '@/lib/services/userService';
import {getRentalShopById} from '@/lib/services/rentalService';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from 'firebase/auth';
import React, {useContext, useEffect, useState} from 'react';
import {RentalShop} from '@/app/[locale]/models/RentalShop';
import {createUserProfileFactory} from '@/lib/helper/createUserProfileFactory';
import {AuthStatus} from '@/types/auth';

interface AuthContextType {
  currentUser: User | null;
  userDataObj: UserProfile | null;
  rentalDataObj: RentalShop | null;
  role: UserRole | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string, username: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  loading: boolean;
  resendVerificationEmail: () => Promise<void>;
  refreshUser: () => Promise<false | User>;
  authStatus: AuthStatus;
  refreshProfile: () => Promise<void>;
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

  const authStatus: AuthStatus = loading
    ? "loading"
    : !currentUser
      ? "guest"
      : !currentUser.emailVerified
        ? "unverified"
        : role === "admin"
          ? "admin"
          : role === "rental"
            ? "rental"
            : role === "user"
              ? "user"
              : "no-profile";


  async function login(email: string, password: string): Promise<UserCredential> {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    //
    // Always refresh user information
    //
    await credential.user.reload();

    const refreshedUser = auth.currentUser;

    if (!refreshedUser) {
      throw new Error("Unable to load user.");
    }

    return credential;
  }

  async function signUp(
    email: string,
    password: string,
    username: string
  ) {

    const credential =
      await createUserWithEmailAndPassword(auth, email, password);

    const firebaseUser = credential.user;

    await updateProfile(firebaseUser, {displayName: username, });

    await sendEmailVerification(firebaseUser);

    const profile = createUserProfileFactory({uid: firebaseUser.uid, email, username, });

    await createUserProfile(profile);

    return credential;
  }

  async function resendVerificationEmail() {
    if (!auth.currentUser) {
      throw new Error("No authenticated user.");
    }
    await sendEmailVerification(auth.currentUser);
  }

  async function refreshUser() {
    if (!auth.currentUser) return false;
    await auth.currentUser.reload();
    return auth.currentUser;
  }

  async function refreshProfile() {
    if (!currentUser) return;

    const profile = await getUserProfileById(currentUser.uid);

    if (profile) {
      setUserDataObj(profile);
    }
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

        if (!user) {
          setCurrentUser(null);
          setUserDataObj(null);
          setRentalDataObj(null);
          setRole(null);
          return;
        }

        await user.reload();

        const refreshedUser = auth.currentUser;

        if (!refreshedUser) {
          setCurrentUser(null);
          return;
        }

        //
        // Block unverified users
        //
        if (!refreshedUser.emailVerified) {
          setCurrentUser(refreshedUser);
          setUserDataObj(null);
          setRentalDataObj(null);
          setRole(null);
          return;
        }

        //
        // User is verified
        //
        setCurrentUser(refreshedUser);

        const uid = user.uid;

        // 1️⃣ Check profiles collection first
        const userProfile = await getUserProfileById(uid);

        if (
          userProfile &&
          refreshedUser.emailVerified &&
          !userProfile.account.emailVerified
        ) {

          await markUserEmailVerified(uid);

          userProfile.account.emailVerified = true;

        }

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
    signUp,
    resendVerificationEmail,
    refreshUser,
    authStatus,
    refreshProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
