"use client";

import Link from "next/link";
import { useUserAuth } from "../_utils/auth-context";

export default function Main() {
    const { user, firebaseSignOut } = useUserAuth();

    async function handleSignOut() {
        try {
            await firebaseSignOut();
            window.location.href = "/Website";
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
                        <Link
                            href="/Website/workouts"
                            className="px-6 m-5 py-3 bg-[#521573] rounded font-bold text-[#ffffff] text-lg hover:bg-[#351242] transition duration-200"
                        >
                            Search For Workouts
                        </Link>
                        <Link
                            href="/Website/view-workout"
                            className="px-6 m-5 py-3 bg-[#521573] rounded font-bold text-[#ffffff] text-lg hover:bg-[#351242] transition duration-200"
                        >
                            View Your Workouts
                        </Link>
                        <Link
                            href="/Website/plan-workout"
                            className="px-6 m-5 py-3 bg-[#521573] rounded font-bold text-[#ffffff] text-lg hover:bg-[#351242] transition duration-200"
                        >
                            Plan Your Workouts
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
