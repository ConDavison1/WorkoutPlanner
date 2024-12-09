"use client";

import { useUserAuth } from "./_utils/auth-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
    const { user, gitHubSignIn } = useUserAuth();
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();


    useEffect(() => {
        setIsClient(true);
    }, []);

    async function handleSignIn() {
        try {
            await gitHubSignIn();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        if (user && isClient) {
            router.push("/Website/home-page");
        }
    }, [user, isClient, router]);

    if (!isClient) {
        return null;
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#000000] to-[#353435] text-white">
            <div className="text-center p-8">
                <img
                    src="../assets/Fitquest.png"
                    alt="FitQuest Logo"
                    className="mx-auto mb-8 w-32 h-auto rounded-full"
                />

                {user ? (
                    <div>

                    </div>
                ) : (
                    <div>
                        <button
                            onClick={handleSignIn}
                            className="px-6 py-3 bg-purple-800 rounded text-white text-lg hover:bg-purple-600 transition duration-200"
                        >
                            Login with GitHub
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
