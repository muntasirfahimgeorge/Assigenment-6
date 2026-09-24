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
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");
      const storedDone = localStorage.getItem("fitlog-done");

      if (storedPlan) {
        setPlan(JSON.parse(storedPlan));
      }

      if (storedSaved) {
        setSaved(JSON.parse(storedSaved));
      }

      if (storedDone) {
        setDone(JSON.parse(storedDone));
      }
    } catch {
      localStorage.removeItem("fitlog-plan");
      localStorage.removeItem("fitlog-saved");
      localStorage.removeItem("fitlog-done");
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan, loaded]);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, loaded]);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("fitlog-done", JSON.stringify(done));
  }, [done, loaded]);

  function addToPlan(workout) {
    if (plan.some((item) => item.id === workout.id)) {
      toast.warning(`${workout.name} is already in your plan!`);
      return;
    }

    if (plan.length >= 5) {
      toast.warning("Today's plan is limited to 5 workouts.");
      return;
    }

    setPlan((current) => [...current, workout]);

    toast.success(`${workout.name} added to your plan!`);
  }

  function removeFromPlan(id) {
    const workout = plan.find((item) => item.id === id);

    setPlan((current) =>
      current.filter((item) => item.id !== id)
    );

    setDone((current) =>
      current.filter((item) => item !== id)
    );

    if (workout) {
      toast.success(`${workout.name} removed from your plan.`);
    }
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
    const workout = saved.find((item) => item.id === id);

    setSaved((current) =>
      current.filter((item) => item.id !== id)
    );

    if (workout) {
      toast.success(`${workout.name} removed from saved.`);
    }
  }

  function markAsDone(id) {
    if (done.includes(id)) {
      return;
    }

    const workout = plan.find((item) => item.id === id);

    setDone((current) => [...current, id]);

    if (workout) {
      toast.success(`${workout.name} marked as done!`);
    }
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