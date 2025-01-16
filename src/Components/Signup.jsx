import React, { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const AuthForms = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
    rememberMe: false,
    terms: false,
  });
  const [errors, setErrors] = useState({});

  const toggleFlip = () => setIsFlipped(!isFlipped);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignInData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateSignIn = () => {
    const newErrors = {};
    if (!signInData.email) newErrors.email = "Email is required.";
    if (!signInData.password) newErrors.password = "Password is required.";
    if (!signInData.rememberMe) newErrors.rememberMe = "You must check 'Remember Me'.";
    if (!signInData.terms) newErrors.terms = "You must agree to the Terms and Conditions.";
    return newErrors;
  };

  const signInWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Google Sign-In successful:", result.user);
      })
      .catch((error) => {
        console.error("Error with Google Sign-In:", error.message);
      });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const validationErrors = validateSignIn();
    if (Object.keys(validationErrors).length === 0) {
      alert("Sign In Successful!");
      console.log(signInData);
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      /* global google */
      google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace with your actual client ID
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        {
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "circle",
        }
      );
    };
    if (window.google) initializeGoogleSignIn();
  }, []);

  const handleCredentialResponse = (response) => {
    try {
      const userInfo = JSON.parse(atob(response.credential.split(".")[1]));
      console.log("User Info:", userInfo);
      alert(`Welcome ${userInfo.name}!`);
    } catch (error) {
      console.error("Error parsing Google response:", error);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute w-[150%] h-[150%] origin-center -translate-x-1/4 -translate-y-1/4"
          style={{
            background: `linear-gradient(150deg, 
              rgb(13, 148, 136) 60%, 
              rgb(132, 204, 22) 40%)`,
          }}
        />
      </div>
      <div className="min-h-screen relative flex items-center justify-center">
        <div className="relative w-96 h-96">
          <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
            {/* Sign Up Form */}
            <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-sm p-8 flex flex-col items-center justify-center shadow-xl">
              <div className="w-64">
                <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">SIGN UP</h2>
                <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">CREATE AN ACCOUNT</h3>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  className="w-full mb-3 p-2 text-sm border-b-2 border-black bg-transparent text-white placeholder-white focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full mb-3 p-2 text-sm border-b-2 border-black bg-transparent text-white placeholder-white focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="w-full mb-3 p-2 text-sm border-b-2 border-black bg-transparent text-white placeholder-white focus:outline-none"
                />
                 <button className="w-full text-red-500 py-2 rounded-full mb-3 text-sm shadow-md">
  Submit
</button>



                <p className="text-xs text-center text-gray-700">
                  Already Have An Account?{" "}
                  <button onClick={toggleFlip} className="text-blue-500 hover:underline">
                    Sign In
                  </button>
                </p>
              </div>
            </div>

            {/* Sign In Form */}
            <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-sm p-8 flex flex-col items-center justify-center shadow-xl">
              <div className="w-64">
                <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">SIGN IN</h2>
                <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">SIGN IN TO YOUR ACCOUNT</h3>
                <form onSubmit={handleSignIn}>
                  <input
                    type="email"
                    name="email"
                    value={signInData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    className="w-full mb-3 p-2 text-sm border-b-2 border-black bg-transparent text-white placeholder-white focus:outline-none"
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  <input
                    type="password"
                    name="password"
                    value={signInData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    className="w-full mb-3 p-2 text-sm border-b-2 border-black bg-transparent text-white placeholder-white focus:outline-none"
                  />
                  {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                  <div className="mb-3 flex items-center space-x-4">
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
                  {errors.rememberMe && (
                    <p className="text-xs text-red-500">{errors.rememberMe}</p>
                  )}
                  {errors.terms && <p className="text-xs text-red-500">{errors.terms}</p>}
                  <button className="w-full text-red-500 py-2 rounded-full mb-3 text-sm shadow-md">
  Submit
</button>


                </form>

                {/* Google Sign In Button */}
                <div
                  id="googleSignInButton"
                  className="w-full py-2 rounded-full text-sm flex items-center justify-center"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    // backgroundColor: "white",
                    // border: "2px solid #34A853",
                    color: "#34A853",
                    // borderRadius: "9999px",
                    padding: "10px",
                    cursor: "pointer",
                  }}
                  onClick={signInWithGoogle}
                >
                  
                  <span className="mr-2" style={{ color: "black" }}>Sign in with</span>
                  <span style={{ color: "#34A853" }}>Google</span>
                </div>

                <p className="text-xs text-center text-gray-700">
                  Don't Have An Account?{" "}
                  <button onClick={toggleFlip} className="text-blue-500 hover:underline">
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </ReactCardFlip>
        </div>
      </div>
    </div>
  );
};

export default AuthForms;
