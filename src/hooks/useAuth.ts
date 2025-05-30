"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider
} from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"
import { useState, useEffect } from "react"

export function useAuth() {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  
  // Check for redirect result from Firebase auth
  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth)
        if (result) {
          // After firebase auth, also sign in with NextAuth
          await signIn("credentials", {
            email: result.user.email,
            password: "", // No password since we authenticated with Google
            redirect: false,
          })
        }
      } catch (err) {
        console.error("Failed to process auth redirect:", err)
      }
    }
    
    checkRedirectResult()
  }, [])
  
  // Sign up with email/password
  const signUp = async (name: string, email: string, password: string) => {
    setLoading(true)
    setError("")
    
    try {
      // Firebase signup
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Store additional user data in MongoDB via API
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          id: userCredential.user.uid,
          name,
          email,
          createdAt: new Date(),
          updatedAt: new Date()
        }),
      })
      
      if (!res.ok) {
        throw new Error("Failed to create user profile")
      }
      
      // Sign in with NextAuth
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
      
      router.push("/profile")
    } catch (err: any) {
      console.error("Sign up error:", err)
      setError(err.message || "Failed to sign up")
    } finally {
      setLoading(false)
    }
  }
  
  // Sign in with email/password
  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true)
    setError("")
    
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
      
      router.push("/profile")
    } catch (err: any) {
      console.error("Sign in error:", err)
      setError(err.message || "Failed to sign in")
    } finally {
      setLoading(false)
    }
  }
  
  // Sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true)
    setError("")
    
    try {
      // Using Firebase for Google auth with redirect
      await signInWithRedirect(auth, googleProvider)
      // Result is handled in the useEffect above
    } catch (err: any) {
      console.error("Google sign in error:", err)
      setError(err.message || "Failed to sign in with Google")
      setLoading(false)
    }
  }
  
  const logout = async () => {
    await auth.signOut() // Firebase logout
    await signOut({ callbackUrl: "/" }) // NextAuth logout
  }
  
  return {
    user: session?.user,
    isAuthenticated: status === "authenticated",
    loading,
    error,
    signUp,
    signInWithEmail,
    signInWithGoogle,
    logout,
  }
}