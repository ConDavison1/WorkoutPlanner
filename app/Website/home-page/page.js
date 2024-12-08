"use client";

import Link from "next/link";
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from 'next/navigation';

export default function Main() {
    const { user, firebaseSignOut } = useUserAuth();
    const router = useRouter(); // Initialize router

    async function handleSignOut() {
        try {
            await firebaseSignOut();
            router.push("/Website"); // Use router.push for smooth navigation
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-grey-500 to-white-500 text-[#ffffff]">
            <div className="text-center p-8">
                <img
                    src="../../assets/Fitquest.png"
                    alt="FitQuest Logo"
                    className="mx-auto mb-8 w-32 h-auto rounded-full"
                />

                <h1 className="text-5xl font-bold mb-6 p-10">Welcome to Fit Quest!</h1>

                {user ? (
                    <div>
                        <Link href="/Website/home-page" className="text-white text-xl font-bold">
                            Home
                        </Link>
                        <Link href="/Website/view-workout" className="text-white text-xl font-bold">
                            View
                        </Link>
                        <Link href="/Website/workouts" className="text-white text-xl font-bold">
                            Search
                        </Link>
                        <Link href="/Website/plan-workout" className="text-white text-xl font-bold">
                            Plan
                        </Link>
                        <div>
                            <button
                                onClick={handleSignOut}
                                className="px-6 m-10 py-3 bg-[#521573] rounded font-bold text-[#ffffff] text-lg hover:bg-[#351242] transition duration-200"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <Link
                            href="/sign-in"
                            className="px-6 py-3 bg-[#521573] rounded text-white text-lg hover:bg-[#351242] transition duration-200"
                        >
                            Login with GitHub
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
