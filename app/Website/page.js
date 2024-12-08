"use client";

import { useUserAuth } from "./_utils/auth-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for next/navigation in app dir

export default function SignInPage() {
    const { user, gitHubSignIn } = useUserAuth();
    const [isClient, setIsClient] = useState(false); // Flag to ensure client-side rendering
    const router = useRouter(); // Initialize router

    // Only enable client-side features after the component has mounted
    useEffect(() => {
        setIsClient(true); // After the component mounts, set it to client-side
    }, []);

    async function handleSignIn() {
        try {
            await gitHubSignIn();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // Ensure navigation only happens on client side
        if (user && isClient) {
            router.push("/Website/home-page"); // Redirect user if authenticated
        }
    }, [user, isClient, router]);

    if (!isClient) {
        return null; // Don't render anything on the server (i.e., no SSR issues)
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#000000] to-[#353435] text-white">
            <div className="text-center p-8">
                <h1 className="text-5xl font-bold mb-6">Please Login</h1>
                {user ? (
                    <div>
                        {/* Optionally show loading or user info here */}
                    </div>
                ) : (
                    <div>
                        <button
                            onClick={handleSignIn}
                            className="px-6 py-3 bg-blue-600 rounded text-white text-lg hover:bg-blue-500 transition duration-200"
                        >
                            Login with GitHub
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
