const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid workout data");
  }

  return data;
}

export async function getWorkout(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Workout not found");
  }

  return response.json();
}