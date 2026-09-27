# FitLog

FitLog is a dark-themed workout library and planning application built with Next.js. Users can browse workouts, view detailed workout information, add exercises to today's plan, save workouts for later, and track their planned workout totals.

## Technologies Used

- Next.js
- React
- JavaScript
- Tailwind CSS
- Lucide React
- React Hot Toast
- FitLog REST API
- Local Storage

## Features

1. Browse 12 workouts fetched dynamically from the FitLog API.
2. View detailed workout information including equipment, difficulty, sets, reps, duration, calories, rating, and instructions.
3. Add workouts to Today's Plan with a maximum limit of 5 exercises.
4. Save workouts for later and manage them from the Saved tab.
5. Track total exercises, workout minutes, and calories in Today's Plan.
6. Mark planned workouts as completed or remove workouts from the plan.
7. Sort the workout library by duration, calories, or rating.
8. Plan and Saved counters update automatically in the navigation bar.
9. Workout data is stored in localStorage so the plan and saved workouts remain after refreshing the page.
10. Responsive design for mobile, tablet, and desktop devices.
11. Toast notifications provide feedback for workout actions.
12. Custom loading, empty, error, and 404 states.

## API

FitLog uses the provided workout API:

`https://api.abcz.workers.dev/api/fitlog`

Individual workout details are loaded using:

`https://api.abcz.workers.dev/api/fitlog/:id`

## Pages

- `/` — Workout Library
- `/workout/:id` — Workout Details
- `/my-plan` — Today's Plan and Saved Workouts