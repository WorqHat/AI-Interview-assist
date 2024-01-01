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
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);

  const router = useRouter();

  const isUsernameValid = /^[a-zA-Z0-9_-]{3,16}$/.test(username);
  const isPasswordStrongEnough =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(
      password,
    );

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
      !isPasswordStrongEnough ||
      !isConfirmPasswordValid
    ) {
      setError("Invalid username or password format.");
      return;
    }

    try {
      const response = await fetch("/api/passport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, isSignUpMode }),
      });

      if (response.ok) {
        console.log("Login successful!");
        router.push("/try-interview");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      setError("An unexpected error occurred.");
    }
  };

  const toggleMode = () => {
    setIsSignUpMode((prevMode) => !prevMode);
    setError(null); 
  };

  return (
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
              isUsernameValid ? "border-green-500" : "border-red-500"
            }`}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            className={`w-full p-2 border rounded-md ${
              isPasswordStrongEnough ? "border-green-500" : "border-red-500"
            }`}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isPasswordStrongEnough && (
            <p className="text-red-500 mt-2">
              Password must contain at least one capital letter, one numeric
              digit, one special character, and have a minimum length of 8
              characters.
            </p>
          )}

          <input
            className={`w-full p-2 border rounded-md ${
              isConfirmPasswordValid ? "border-green-500" : "border-red-500"
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
  );
};

export default Login;
