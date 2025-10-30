import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-6">
      <Card className="max-w-lg text-center shadow-lg rounded-2xl">
        <CardContent className="space-y-6 p-8">
          <h1 className="text-3xl font-bold text-blue-700">
            Non-Communicable Diseases Tracker System
          </h1>
          <p className="text-gray-700">
            Welcome to your home guide. We help you track your progress and provide you with day to day recommendations, on ways to manage your disease. <br />
            Please sign in to enjoy our services😊😊
          </p>

        </CardContent>
      </Card>

      <footer className="mt-10 text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} Digital Health System- Tracker. All rights reserved.
      </footer>
    </div>
  );
}
