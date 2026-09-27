"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadStoredWorkouts = () => {
      try {
        const storedPlan =
          localStorage.getItem("fitlog-plan");

        const storedSaved =
          localStorage.getItem("fitlog-saved");

        if (storedPlan) {
          setPlan(JSON.parse(storedPlan));
        }

        if (storedSaved) {
          setSaved(JSON.parse(storedSaved));
        }

        setLoaded(true);
      } catch (error) {
        console.error(
          "Could not load FitLog data:",
          error
        );

        setLoaded(true);
      }
    };

    const timer = setTimeout(
      loadStoredWorkouts,
      0
    );

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(plan)
    );
  }, [plan, loaded]);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(saved)
    );
  }, [saved, loaded]);

  const addToPlan = (workout) => {
    if (
      plan.some(
        (item) => item.id === workout.id
      )
    ) {
      return {
        success: false,
        message:
          "Workout is already in today's plan.",
      };
    }

    if (plan.length >= 5) {
      return {
        success: false,
        message:
          "Today's plan can have a maximum of 5 workouts.",
      };
    }

    setPlan((currentPlan) => [
      ...currentPlan,
      workout,
    ]);

    return {
      success: true,
      message:
        "Workout added to today's plan.",
    };
  };

  const saveWorkout = (workout) => {
    if (
      saved.some(
        (item) => item.id === workout.id
      )
    ) {
      return {
        success: false,
        message:
          "Workout is already saved.",
      };
    }

    setSaved((currentSaved) => [
      ...currentSaved,
      workout,
    ]);

    return {
      success: true,
      message:
        "Workout saved for later.",
    };
  };

  const removeFromPlan = (id) => {
    setPlan((currentPlan) =>
      currentPlan.filter(
        (workout) => workout.id !== id
      )
    );
  };

  const removeFromSaved = (id) => {
    setSaved((currentSaved) =>
      currentSaved.filter(
        (workout) => workout.id !== id
      )
    );
  };

  const markAsDone = (id) => {
    setPlan((currentPlan) =>
      currentPlan.filter(
        (workout) => workout.id !== id
      )
    );
  };

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        loaded,
        addToPlan,
        saveWorkout,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      "useWorkout must be used inside WorkoutProvider"
    );
  }

  return context;
}