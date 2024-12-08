"use client";


import { useUserAuth } from "./_utils/auth-context";
import { useEffect } from "react";

export default function SignInPage() {
    const { user, gitHubSignIn, } = useUserAuth();


    async function handleSignIn() {
        try {
            await gitHubSignIn();
        } catch (error) {
            console.log(error);
        }
    }





    useEffect(() => {
        if (user) {
            window.location.href = "/Website/home-page";
        }
    }, [user]);

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <div className="text-center p-8">
                <h1 className="text-5xl font-bold mb-6">Please Login </h1>
                {user ? (
                    <div>

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
        </div >
    );
}
