import Link from 'next/link';

export default function About() {
    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-grey-500 to-white-500 text-[#ffffff]">
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
            <div className="text-center p-8">
                <img
                    src="../../assets/Fitquest.png"
                    alt="FitQuest Logo"
                    className="mx-auto mb-8 w-32 h-auto rounded-full"
                />

                <h1 className="text-5xl font-bold mb-6 p-10">About</h1>
                <p className="text-xl mb-6 text-[#b633ee]">
                    <strong className="text-[#ffffff]">Fit Quest</strong> is a web application designed to help users track their fitness journey.
                    The application allows users to log their workouts, view workout progress, and stay motivated by tracking their fitness goals.
                    Users can sign up, log in, and authenticate using their GitHub account. The app provides a user-friendly
                    interface with interactive features that make it easy to track your workout routines, plan goals, and see progress over time.
                </p>
                <p className="text-xl mb-6 font-bold">This Website was created by Connor Davison</p>
            </div>
        </div>
    );
}