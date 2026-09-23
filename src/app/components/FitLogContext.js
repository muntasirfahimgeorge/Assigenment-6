"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const FitLogContext = createContext();

export function FitLogProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog-plan");
    const savedWorkouts = localStorage.getItem("fitlog-saved");
    const savedDone = localStorage.getItem("fitlog-done");

    if (savedPlan) {
      setPlan(JSON.parse(savedPlan));
    }

    if (savedWorkouts) {
      setSaved(JSON.parse(savedWorkouts));
    }

    if (savedDone) {
      setDone(JSON.parse(savedDone));
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    }
  }, [plan, loaded]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    }
  }, [saved, loaded]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("fitlog-done", JSON.stringify(done));
    }
  }, [done, loaded]);

  function addToPlan(workout) {
    if (plan.length >= 5) {
      toast.warning("Today's plan is limited to 5 workouts.");
      return;
    }

    if (plan.some((item) => item.id === workout.id)) {
      toast.warning(`${workout.name} is already in your plan!`);
      return;
    }

    setPlan((current) => [...current, workout]);
    toast.success(`${workout.name} added to your plan!`);
  }

  function removeFromPlan(id) {
    setPlan((current) => current.filter((item) => item.id !== id));
  }

  function saveWorkout(workout) {
    if (saved.some((item) => item.id === workout.id)) {
      toast.warning(`${workout.name} is already saved!`);
      return;
    }

    setSaved((current) => [...current, workout]);
    toast.success(`${workout.name} saved for later!`);
  }

  function removeSaved(id) {
    setSaved((current) => current.filter((item) => item.id !== id));
  }

  function markAsDone(id) {
    if (done.includes(id)) {
      return;
    }

    setDone((current) => [...current, id]);
  }

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        done,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeSaved,
        markAsDone,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  return useContext(FitLogContext);
}