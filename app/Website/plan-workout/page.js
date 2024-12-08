"use client";

import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { saveWorkoutPlan } from "../_services/workout-service";
import Link from "next/link";

export default function PlanWorkouts() {
    const { user } = useUserAuth();
    const [workoutData, setWorkoutData] = useState({
        saturday: "",
        sunday: "",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const handleChange = (e) => {
        setWorkoutData({
            ...workoutData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        for (let day in workoutData) {
            if (!workoutData[day].trim()) {
                return `Please enter a workout for ${day.charAt(0).toUpperCase() + day.slice(1)}.`;
            }
        }
        return "";
    };

    const handleSubmit = async () => {
        if (!user) {
            setError("Need to log in to save your workout plan.");
            return;
        }

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setError("");

        try {
            await saveWorkoutPlan(user.uid, workoutData);
            setSuccess("Workout plan saved successfully!");
            setWorkoutData({
                saturday: "",
                sunday: "",
                monday: "",
                tuesday: "",
                wednesday: "",
                thursday: "",
                friday: "",
            });
        } catch (error) {
            console.log(error);
            setError("Error saving workout plan.");
        }
    };



    return (
        <div className="flex justify-center items-center h-screen text-white">
            <div className="text-center p-8">
                <header className="fixed top-0 left-0 w-full p-4 bg-gradient-to-r from-[#5d2768] to-[#8005b5] flex justify-between items-center text-white shadow-md z-10">
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

                <h1 className="pt-20 text-5xl font-bold mb-6 mt-16">Plan Your Workouts</h1>

                {user ? (
                    <div className="space-y-4">
                        {error && <p className="text-white">{error}</p>}
                        {success && <p className="text-white font-bold">{success}</p>}

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
                                            <input
                                                type="text"
                                                name={day}
                                                value={workoutData[day]}
                                                onChange={handleChange}
                                                className="p-2 bg-white text-black rounded"
                                                placeholder={`Workout for ${day.charAt(0).toUpperCase() + day.slice(1)}`}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <button
                            onClick={handleSubmit}
                            className="mt-6 px-6 py-3 bg-purple-800 rounded text-white text-lg hover:bg-purple-600 transition duration-200"
                        >
                            Save Workout Plan
                        </button>
                    </div>
                ) : (
                    <p>Please log in to plan your workouts.</p>
                )}
            </div>
        </div>
    );
}
