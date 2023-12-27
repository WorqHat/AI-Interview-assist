// Login.tsx
import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  const router = useRouter();

  const handleLogin = async () => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      console.log('Login successful!');
      router.push('/try-interview');
    } else {
      const errorData = await response.json();
      console.error('Login failed:', errorData.error);
    }
  } catch (error: any) {
    console.error('Login failed:', error);
  }
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
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <div className="mb-4">
          <input
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full p-2 border rounded-md"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* <Link href="/try-interview"> */}
        <button
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
        {/* </Link> */}
        
      </div>
    </div>
  );
};

export default Login;
