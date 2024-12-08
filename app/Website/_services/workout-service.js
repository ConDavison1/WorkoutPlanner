import { db } from "../_utils/firebase";
import { doc, setDoc, collection } from 'firebase/firestore';


export const saveWorkoutPlan = async (userId, workoutData) => {
    try {

        const workoutPlansRef = collection(db, 'users', userId, 'workoutPlans');


        const workoutPlanDoc = doc(workoutPlansRef);


        await setDoc(workoutPlanDoc, workoutData);

        console.log("Workout plan saved successfully!");
    } catch (error) {
        console.error("Error saving workout plan:", error);
        throw error;
    }
};
