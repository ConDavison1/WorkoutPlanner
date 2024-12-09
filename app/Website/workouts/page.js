"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const WorkoutsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const exercisesPerPage = 12;
    const [selectedExercise, setSelectedExercise] = useState(null);


    useEffect(() => {
        const fetchExercises = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch exercises.");
                }
                const data = await response.json();
                setExercises(data);
            } catch (err) {
                setError("Failed to fetch exercises. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchExercises();
    }, []);


    const filteredExercises = exercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    const currentExercises = filteredExercises.slice(
        indexOfFirstExercise,
        indexOfLastExercise
    );


    const nextPage = () => {
        if (currentPage < Math.ceil(filteredExercises.length / exercisesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    const handleExerciseClick = (exercise) => {
        if (selectedExercise && selectedExercise.id === exercise.id) {
            setSelectedExercise(null);
        } else {
            setSelectedExercise(exercise);
        }
    };

    return (
        <div className="pt-20 font-sans">
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

            <h1 className="text-white text-3xl font-bold mb-6">Search For Workout Ideas</h1>
            <input
                type="text"
                placeholder="Search for an exercise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border border-white-300 rounded mb-6 text-white bg-[#521573]"
            />

            {loading && <p>Loading exercises...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentExercises.map((exercise) => (
                    <div
                        key={exercise.id}
                        className={`p-5 border bg-[#521573] text-white border-gray-200 rounded shadow cursor-pointer ${selectedExercise && selectedExercise.id === exercise.id ? "h-auto" : "h-64"
                            }`}
                        onClick={() => handleExerciseClick(exercise)}
                    >
                        <h3 className="font-bold text-lg">{exercise.name}</h3>
                        <p>
                            <strong>Category:</strong> {exercise.category}
                        </p>
                        <p>
                            <strong>Primary Muscles:</strong> {exercise.primaryMuscles.join(", ")}
                        </p>
                        <p>
                            <strong>Equipment:</strong> {exercise.equipment || "None"}
                        </p>
                        <p>
                            <strong>---------------</strong>
                        </p>
                        <p>
                            <strong>Click For Instructions</strong>
                        </p>

                        {selectedExercise && selectedExercise.id === exercise.id && (
                            <div className="mt-4 p-4 border border-gray-300 rounded bg-[#521573]">
                                <h4 className="font-bold text-xl text-white">Instructions:</h4>

                                <ul className="text-white">
                                    {exercise.instructions && exercise.instructions.length > 0 ? (
                                        exercise.instructions.map((step, index) => (
                                            <li key={index} className="list-inside list-decimal">
                                                {step}
                                            </li>
                                        ))
                                    ) : (
                                        <li>No instructions available.</li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex justify-between mt-6">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-[#5e136a] text-white rounded mb-5 ml-40"
                >
                    Previous
                </button>
                <button
                    onClick={nextPage}
                    disabled={currentPage === Math.ceil(filteredExercises.length / exercisesPerPage)}
                    className="px-4 py-2 bg-[#5e136a] text-white rounded mb-5 mr-40"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default WorkoutsPage;
