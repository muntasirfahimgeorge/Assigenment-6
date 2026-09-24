# FitLog

FitLog is a modern workout library built with Next.js. It allows users to explore workouts, view detailed exercise information, create a daily workout plan, save workouts for later, and track completed exercises.

## Technologies Used

- Next.js
- React
- Tailwind CSS
- JavaScript
- Lucide React
- React Toastify
- FitLog Workout API

## Key Features

1. Browse a workout library with exercise images, equipment, duration, calories, and ratings.
2. View detailed workout information including difficulty, sets, reps, and instructions.
3. Add workouts to Today's Plan with a maximum limit of five exercises.
4. Save workouts for later and manage saved exercises.
5. Mark planned workouts as completed and remove workouts from the plan.
6. Sort workouts by duration, calories, or rating.
7. Data is stored in localStorage so the plan and saved workouts remain available after refreshing the page.
8. Responsive design for desktop, tablet, and mobile devices.

## Project Structure

- `/` — Workout Library
- `/workout/[id]` — Workout Details
- `/my-plan` — Today's Plan and Saved Workouts

## API

FitLog uses the FitLog Workout API to load workout data.

## Getting Started

Install dependencies:

```bash
npm install