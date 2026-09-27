# FitLog

FitLog is a responsive workout library and planning web application built with Next.js. Users can browse workouts, view detailed exercise information, create a daily workout plan, save workouts for later, and track workout statistics.

## Technologies Used

- Next.js
- React
- JavaScript
- Tailwind CSS
- Lucide React
- React Hot Toast
- REST API
- Local Storage

## Features

- Browse 12 workouts dynamically fetched from the FitLog API.
- View detailed workout information including equipment, difficulty, sets, reps, duration, calories, rating, and instructions.
- Add workouts to Today's Plan with a maximum limit of 5 exercises.
- Save workouts for later and manage them from the Saved tab.
- Track total exercises, workout minutes, and calories in Today's Plan.
- Mark planned workouts as completed.
- Remove workouts from Today's Plan or Saved workouts.
- Sort workouts by duration, calories, or rating.
- Plan and Saved counters update automatically in the navigation bar.
- Workout data is stored in localStorage and remains after page refresh.
- Responsive design for mobile, tablet, and desktop devices.
- Toast notifications provide feedback for workout actions.
- Custom loading, empty, error, and 404 states.

## API

All workouts:

`https://api.abcz.workers.dev/api/fitlog`

Single workout:

`https://api.abcz.workers.dev/api/fitlog/:id`

## Pages

- `/` — Workout Library
- `/workout/:id` — Workout Details
- `/my-plan` — Today's Plan and Saved Workouts

## Repository

https://github.com/Jahidul-Islam01/fit-track