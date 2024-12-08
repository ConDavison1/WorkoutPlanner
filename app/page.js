"use client";

import Link from 'next/link';

export default function Main() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <div className="text-center p-8">
        <h1 className="text-5xl font-bold mb-6">Welcome to Fit Quest!</h1>
        <p className="text-xl mb-6">Find and Track the perfect exercises to improve your fitness.</p>
        <Link
          href="./Website/"
          className="px-6 py-3 bg-purple-800 rounded text-white text-lg hover:bg-purple-600 transition duration-200"
        >
          Get Started!
        </Link>
      </div>
    </div>
  );
}