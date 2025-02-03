import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { auth, googleProvider } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

const AuthForms = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
    rememberMe: false,
    terms: false,
  });
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState(null);

  const toggleFlip = () => setIsFlipped(!isFlipped);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignInData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateSignIn = () => {
    return signInData.email && signInData.password && signInData.terms;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateSignIn()) {
      setAlert("Please fill out all required fields.");
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    try {
      await signInWithEmailAndPassword(
        auth,
        signInData.email,
        signInData.password
      );
      setAlert("Sign In Successful!");
    } catch (error) {
      setAlert(error.message);
    }
    setTimeout(() => setAlert(null), 3000);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!signUpData.name || !signUpData.email || !signUpData.password) {
      setAlert("Please fill out all required fields.");
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        signUpData.email,
        signUpData.password
      );
      setAlert("Sign Up Successful! Redirecting to Sign In...");
      setTimeout(() => {
        toggleFlip();
      }, 3000);
    } catch (error) {
      setAlert(error.message);
    }
    setTimeout(() => setAlert(null), 3000);
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setAlert("Google Sign-In Successful!");
    } catch (error) {
      setAlert(error.message);
    }
    setTimeout(() => setAlert(null), 3000);
  };

  const handleForgotPassword = async () => {
    if (!signInData.email) {
      setAlert("Please enter your email to reset password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, signInData.email);
      setAlert("Password reset email sent!");
    } catch (error) {
      setAlert(error.message);
    }
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute w-[150%] h-[150%] origin-center -translate-x-1/4 -translate-y-1/4"
          style={{
            background: `linear-gradient(150deg, rgb(13, 148, 136) 60%, rgb(132, 204, 22) 40%)`,
          }}
        />
      </div>
      <div className="min-h-screen relative flex items-center justify-center">
        <div className="relative w-96 h-96">
          <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
            <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-sm p-8 flex flex-col items-center justify-center shadow-xl">
              <div className="w-64">
                <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
                  SIGN UP
                </h2>
                <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">
                  CREATE AN ACCOUNT
                </h3>
                <form onSubmit={handleSignUp}>
                  <input
                    type="text"
                    name="name"
                    value={signUpData.name}
                    onChange={handleSignUpChange}
                    placeholder="Enter Full Name"
                    className="w-full mb-2 p-2 text-sm border-b-2 border-black bg-transparent text-white placeholder-white focus:outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    value={signUpData.email}
                    onChange={handleSignUpChange}
                    placeholder="Enter Email"
                    className="w-full mb-2 p-2 text-sm border-b-2 border-black bg-transparent text-white placeholder-white focus:outline-none"
                  />
                  <input
                    type="password"
                    name="password"
                    value={signUpData.password}
                    onChange={handleSignUpChange}
                    placeholder="Enter Password"
                    className="w-full mb-2 p-2 text-sm border-b-2 border-black bg-transparent text-white placeholder-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full text-red-500 py-2 rounded-full mb-2 text-sm shadow-md"
                  >
                    Submit
                  </button>
                </form>
                <p className="text-xs text-center text-gray-700">
                  Already Have An Account?{" "}
                  <button
                    onClick={toggleFlip}
                    className="text-blue-500 hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </div>

            <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-sm p-8 flex flex-col items-center justify-center shadow-xl">
              <div className="w-64">
                <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
                  SIGN IN
                </h2>
                <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">
                  SIGN IN TO YOUR ACCOUNT
                </h3>
                <form onSubmit={handleSignIn}>
                  <input
                    type="email"
                    name="email"
                    value={signInData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    className="w-full mb-2 p-2 text-sm border-b-2 border-black bg-transparent text-white placeholder-white focus:outline-none"
                  />
                  <input
                    type="password"
                    name="password"
                    value={signInData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    className="w-full mb-2 p-2 text-sm border-b-2 border-black bg-transparent text-white placeholder-white focus:outline-none"
                  />
                  <div className="mb-4">
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center text-sm text-white">
                        <input
                          type="checkbox"
                          name="rememberMe"
                          checked={signInData.rememberMe}
                          onChange={handleChange}
                          className="mr-2 accent-black"
                        />
                        Remember Me
                      </label>
                      <label className="flex items-center text-sm text-white">
                        <input
                          type="checkbox"
                          name="terms"
                          checked={signInData.terms}
                          onChange={handleChange}
                          className="mr-2 accent-black"
                        />
                        Terms
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-red-500 py-2 rounded-full mb-2 text-sm shadow-md"
                  >
                    Submit
                  </button>
                </form>

                <div
                  id="googleSignInButton"
                  className="w-full py-2 rounded-full text-sm flex items-center justify-center"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#34A853",
                    padding: "10px",
                    cursor: "pointer",
                  }}
                  onClick={handleGoogleSignIn}
                >
                  <span className="mr-2" style={{ color: "black" }}>
                    Sign in with
                  </span>
                  <span style={{ color: "#34A853" }}>Google</span>
                </div>
                
                <button
                  onClick={handleForgotPassword}
                  className="text-blue-600 hover:underline text-xs mt-0 mx-auto block"
                >
                  Forgot Password?
                </button>

                <p className="text-xs text-center text-gray-700">
                  Don't Have An Account?{" "}
                  <button
                    onClick={toggleFlip}
                    className="text-blue-500 hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </ReactCardFlip>
        </div>
      </div>

      {alert && (
        <div
          className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg"
          style={{ zIndex: 9999 }}
        >
          {alert}
        </div>
      )}
    </div>
  );
};

export default AuthForms;
