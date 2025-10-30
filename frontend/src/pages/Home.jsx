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

          {/* <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Link to="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Go to Dashboard
              </Button>
            </Link>

            <Link to="/login">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Admin Login
              </Button>
            </Link>
          </div> */}
        </CardContent>
      </Card>

      <footer className="mt-10 text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} Digital Health Systems. All rights reserved.
      </footer>
    </div>
  );
}
