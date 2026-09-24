# FitLog

FitLog is a modern workout library built with Next.js. It allows users to explore workouts, view detailed exercise information, create a daily workout plan, save workouts for later, and track completed exercises.

## Live Project

- Live Link: https://assigenment-6-q8w5.vercel.app/
- GitHub Repository: https://github.com/muntasirfahimgeorge/Assigenment-6.git


## Technologies Used

- Next.js
- React
- Tailwind CSS
- JavaScript
- Lucide React
- React Toastify
- FitLog Workout API
- localStorage

## Key Features

1. Browse a responsive workout library with exercise images, equipment, duration, calories, and ratings.
2. View detailed workout information including difficulty, sets, reps, and instructions.
3. Add workouts to Today's Plan with a maximum limit of five exercises.
4. Save workouts for later and manage saved exercises.
5. Mark planned workouts as completed and remove workouts from the plan.
6. Sort workouts by duration, calories, or rating.
7. Plan, saved, and completed workout data persists using localStorage.
8. Responsive design for desktop, tablet, and mobile devices.
9. Toast notifications for workout actions.
10. Custom 404 page for invalid routes.

## Pages

### Home

The home page contains:

- Navigation bar
- Workout library hero section
- Workout library
- Sort dropdown
- Responsive workout cards
- Footer

### Workout Details

The workout details page contains:

- Workout image
- Workout title
- Description
- Category tags
- Equipment
- Difficulty
- Sets
- Reps
- Duration
- Calories
- Rating
- Instructions
- Add to Today's Plan button
- Save for Later button

### My Plan

The My Plan page contains:

- Exercise count
- Total minutes
- Total calories
- Today's Plan tab
- Saved tab
- View Details action
- Mark as Done action
- Remove action
- Empty state

## API

FitLog uses the FitLog Workout API to load workout data.

### All Workouts

https://api.abcz.workers.dev/api/fitlog

### Single Workout

https://api.abcz.workers.dev/api/fitlog/:id

## Project Structure

```text
src/
└── app/
    ├── components/
    │   ├── FitLogContext.js
    │   ├── Footer.js
    │   ├── Hero.js
    │   ├── Library.js
    │   ├── Navbar.js
    │   └── WorkoutCard.js
    │
    ├── lib/
    │   └── api.js
    │
    ├── my-plan/
    │   └── page.js
    │
    ├── workout/
    │   └── [id]/
    │       └── page.js
    │
    ├── not-found.js
    ├── globals.css
    ├── layout.js
    └── page.js