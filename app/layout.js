import "./globals.css";
import { Inter, Oswald } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { WorkoutProvider } from "@/components/WorkoutContext";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata = {
  title: "FitLog",
  description:
    "FitLog is a dark, no-nonsense gym companion for planning and tracking workouts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${oswald.variable}`}
      >
        <WorkoutProvider>
          <div className="flex min-h-screen flex-col">
            <div className="flex-1">
              {children}
            </div>

            <Footer />
          </div>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#151515",
                color: "#ffffff",
                border: "1px solid #333333",
              },
              success: {
                iconTheme: {
                  primary: "#ccff00",
                  secondary: "#000000",
                },
              },
            }}
          />
        </WorkoutProvider>
      </body>
    </html>
  );
}