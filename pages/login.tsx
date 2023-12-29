// Login.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSignUpMode, setIsSignUpMode] = useState(false); // State to toggle between sign-up and login
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  const router = useRouter();

  const isUsernameValid = /^[a-zA-Z0-9_-]{3,16}$/.test(username);
  const isPasswordValid = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/.test(password);

  const handleAction = async () => {
    if (!isUsernameValid || !isPasswordValid) {
      setError('Invalid username or password format.');
      return;
    }

    // Handle login logic
    try {
      const response = await fetch('/api/passport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, isSignUpMode }),
      });

      if (response.ok) {
        console.log('Login successful!');
        router.push('/try-interview');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      setError('An unexpected error occurred.');
    }
  };

  const toggleMode = () => {
    setIsSignUpMode((prevMode) => !prevMode);
    setError(null); // Reset error when toggling modes
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-md w-96">
        <Image src="/WorqHat TM Logo.png" width={150} height={50} alt="WorqHat Logo" />

        <h2 className="text-2xl font-semibold mb-6">{isSignUpMode ? 'Sign Up' : 'Login'}</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <input
            className={`w-full p-2 border rounded-md ${isUsernameValid}`}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            className={`w-full p-2 border rounded-md ${isPasswordValid}`}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          onClick={handleAction}
        >
          {isSignUpMode ? 'Sign Up' : 'Login'}
        </button>

        <p className="mt-4">
          {isSignUpMode ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button className="text-blue-500" onClick={toggleMode}>
            {isSignUpMode ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
