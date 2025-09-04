import React, { useState, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "./firebase";
import {
  GoogleAuthProvider,
  signInWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type UserCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Define type for Google callback response
interface GoogleResponse {
  credential: string;
}

declare global {
  interface Window {
    google?: any;
  }
}

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState<boolean>(true);

  const toggleForm = () => setIsRegistering(!isRegistering);

  // Handle register
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("regEmail") as HTMLInputElement).value;
    const password = (form.elements.namedItem("regPassword") as HTMLInputElement).value;
    const name = (form.elements.namedItem("regName") as HTMLInputElement).value;
    const PhoneNumber = (form.elements.namedItem("phone") as HTMLInputElement).value;

    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "users", uid), {
        name: name,
        email: email,
        PhoneNumber: PhoneNumber,
      });

      toast.success("Signed Up Successfully", { position: "top-center" });
      toggleForm();
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
    }
  };

  // Handle login
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("loginEmail") as HTMLInputElement).value;
    const password = (form.elements.namedItem("loginPassword") as HTMLInputElement).value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("User logged in Successfully", { position: "top-center" });
      navigate("/home");
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
    }
  };

  // Handle Google login
  const handleGoogleLogin = async (response: GoogleResponse) => {
    const credential = GoogleAuthProvider.credential(response.credential);
    try {
      const result = await signInWithCredential(auth, credential);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        PhoneNumber: user.phoneNumber,
      });

      toast.success(`Welcome ${user.displayName}`, { position: "top-center" });
      navigate("/home");
    } catch (error: any) {
      toast.error("Google sign-in failed: " + error.message, {
        position: "top-center",
      });
    }
  };

  // Google button init
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    const interval = setInterval(() => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id:
            "643163865031-vasv7ghfd2lj44dsrad90n1ai1b5fhun.apps.googleusercontent.com",
          callback: handleGoogleLogin,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("googleLoginBtn"),
          { theme: "outline", size: "large", text: "signin_with" }
        );

        window.google.accounts.id.renderButton(
          document.getElementById("googleRegisterBtn"),
          { theme: "outline", size: "large", text: "signup_with" }
        );

        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
      <section className="flex-1 flex flex-col justify-center items-center text-center px-6 py-20">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">
          {isRegistering ? "Sign Up for Youth Aid Hub" : "Log In to Youth Aid Hub "}
        </h1>
        <p className="text-lg max-w-xl mb-8">
          {isRegistering
            ? "Join us to explore your campus, unlock quests, and earn rewards!"
            : "Welcome back! Continue your adventure."}
        </p>

        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          {isRegistering ? (
            <form id="registerForm" onSubmit={handleRegister}>
              <input
                type="text"
                id="regName"
                placeholder="Your name"
                className="w-full mb-4 px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="tel"
                id="phone" 
                placeholder="phone" 
                pattern="\+?[0-9\s\-]+" 
                title="Enter a valid phone number"
                className="w-full mb-4 px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="email"
                id="regEmail"
                placeholder="Email"
                className="w-full mb-4 px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="password"
                id="regPassword"
                placeholder="Password"
                className="w-full mb-4 px-4 py-2 border rounded-lg"
                required
              />
              <button
                type="submit"
                id="Signupsubmit"
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Sign Up
              </button>
              <div id="googleRegisterBtn" className="mt-4"></div>
            </form>
          ) : (
            <form id="loginForm" onSubmit={handleLogin}>
              <input
                type="email"
                id="loginEmail"
                placeholder="Email"
                className="w-full mb-4 px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="password"
                id="loginPassword"
                placeholder="Password"
                className="w-full mb-4 px-4 py-2 border rounded-lg"
                required
              />
              <button
                type="submit"
                id="Loginsubmit"
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Log In
              </button>
              <div id="googleLoginBtn" className="mt-4"></div>
            </form>
          )}
        </div>

        <button
          onClick={toggleForm}
          className="mt-6 text-indigo-600 hover:underline"
        >
          {isRegistering ? "Already have an account? Log In" : "New here? Sign Up"}
        </button>
      </section>

      <footer className="py-6 bg-indigo-600 text-white text-center">
        <p>© {new Date().getFullYear()} Youth Aid Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SignUpPage;
