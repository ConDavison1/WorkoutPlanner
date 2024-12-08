"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { getDocs, collection, query, } from "firebase/firestore";
import { db } from "../_utils/firebase";
import Link from "next/link";

export default function ViewWorkout() {
    const { user } = useUserAuth();
    const [workoutPlan, setWorkoutPlan] = useState(null);


    useEffect(() => {

        const fetchWorkoutPlan = async () => {
            if (user) {
                try {
                    const q = query(collection(db, 'users', user.uid, 'workoutPlans'));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {

                        const workoutData = querySnapshot.docs[0].data();
                        setWorkoutPlan(workoutData);
                    } else {
                        console.log("No workout plan found for the user.");
                    }
                } catch (error) {
                    console.error("Error fetching workout plan:", error);

                }
            }
        };

        fetchWorkoutPlan();
    }, [user]);





    return (

        <div className="flex justify-center items-center h-screen text-white">
            <div className="text-center p-8">
                <header
                    className="fixed top-0 left-0 w-full p-4 bg-gradient-to-r from-[#5d2768] to-[#8005b5] flex justify-between items-center text-white shadow-md z-10"
                >
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
                </header>

                <h1 className="text-5xl font-bold mb-6">Your Workout Plan</h1>

                {workoutPlan ? (
                    <div className="space-y-4 ">
                        <table className="mx-auto">
                            <thead>
                                <tr>
                                    <th className="p-4">Day</th>
                                    <th className="p-4">Workout</th>
                                </tr>
                            </thead>
                            <tbody>

                                {["saturday", "sunday", "monday", "tuesday", "wednesday", "thursday", "friday"].map((day) => (
                                    <tr key={day}>
                                        <td className="p-4">{day.charAt(0).toUpperCase() + day.slice(1)}</td>
                                        <td className="p-4">
                                            {workoutPlan[day] || "No workout planned for this day."}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No workout plan found for this user.</p>
                )}
            </div>
        </div>
    );
}
