import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [isCapitalLetter, setIsCapitalLetter] = useState(false);
  const [isNumericDigit, setIsNumericDigit] = useState(false);
  const [isSpecialCharacter, setIsSpecialCharacter] = useState(false);
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const router = useRouter();
  const isUsernameValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsCapitalLetter(/[A-Z]/.test(newPassword));
    setIsNumericDigit(/\d/.test(newPassword));
    setIsSpecialCharacter(/[!@#$%^&*()_+]/.test(newPassword));
    setIsLengthValid(newPassword.length >= 8);

    setIsPasswordValid(
      isCapitalLetter && isNumericDigit && isSpecialCharacter && isLengthValid,
    );
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);

    setIsConfirmPasswordValid(confirmPasswordValue === password);
  };

  const handleAction = async () => {
    if (
      !isUsernameValid ||
      (isSignUpMode &&
        (!isCapitalLetter ||
          !isNumericDigit ||
          !isSpecialCharacter ||
          !isLengthValid ||
          !isConfirmPasswordValid))
    ) {
      setError("Invalid Email or Password format.");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const response = await fetch("/api/passport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, isSignUpMode }),
      });

      if (response.ok) {
        const user = await response.json();
        // console.log("Login successful!",user.userData.username);

        router.push(`/try-interview?user=${user.userData.username}`);
        // router.push(`/try-interview`);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      setError("An unexpected error occurred.");
    }
    finally {
    setIsLoading(false); // Step 3: End loading
  }
  };

  const toggleMode = () => {
    setIsSignUpMode((prevMode) => !prevMode);
    setError(null);
  };

  return (
    <div>
    {isLoading ?  <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
                          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
                        </div> : (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <Image
          src="/WorqHat TM Logo.png"
          width={150}
          height={50}
          alt="WorqHat Logo"
        />

        <h2 className="text-2xl font-semibold mb-6">
          {isSignUpMode ? "Sign Up" : "Login"}
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <input
            className={`w-full p-2 border rounded-md ${
              isUsernameValid ? "border-black" : "border-black"
            }`}
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            className={`w-full p-2 border rounded-md ${
              isSignUpMode
                ? isPasswordValid
                  ? "border-green-500"
                  : "border-black"
                : "border-black"
            }`}
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          {isSignUpMode && (
            <div>
              <p
                className={`mt-2 ${
                  isCapitalLetter ? "text-green-500" : "text-black"
                }`}
              >
                At least one capital letter
              </p>
              <p
                className={`mt-2 ${
                  isNumericDigit ? "text-green-500" : "text-black"
                }`}
              >
                At least one numeric digit
              </p>
              <p
                className={`mt-2 ${
                  isSpecialCharacter ? "text-green-500" : "text-black"
                }`}
              >
                At least one special character
              </p>
              <p
                className={`mt-2 ${
                  isLengthValid ? "text-green-500" : "text-black"
                }`}
              >
                Minimum length of 8 characters
              </p>
            </div>
          )}
        </div>

        {isSignUpMode && (
          <div className="mb-4">
            <input
              className={`w-full p-2 border rounded-md ${
                isConfirmPasswordValid ? "border-green-500" : "border-black"
              }`}
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {!isConfirmPasswordValid && confirmPassword && (
              <p className="text-red-500 mt-2">Passwords do not match.</p>
            )}
          </div>
        )}

        <button
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          onClick={handleAction}
        >
          {isSignUpMode ? "Sign Up" : "Login"}
        </button>

        {isSignUpMode ? (
          <p className="mt-4">
            Already have an account ?{" "}
            <button className="text-blue-500" onClick={toggleMode}>
              Login
            </button>
          </p>
        ) : (
          <p className="mt-4">
            Create an account{" "}
            <button className="text-blue-500" onClick={toggleMode}>
              Sign Up
            </button>
          </p>
        )}
      </div>
    </div>
  ) }
  </div>
);
        }
export default Login;
