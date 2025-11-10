import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <Card className="max-w-2xl text-center shadow-xl rounded-2xl border border-blue-100">
        <CardContent className="space-y-6 p-10">
          <h1 className="text-4xl font-bold text-blue-700">
            Non-Communicable Diseases (NCD) Tracker
          </h1>

          <p className="text-gray-700 text-lg leading-relaxed">
            Take control of your health journey with the <strong>NCD Tracker</strong> — 
            a smart digital tool designed to help patients living with chronic conditions 
            such as diabetes, hypertension, and heart disease.
          </p>

          <p className="text-gray-600 text-base leading-relaxed">
            By regularly recording your symptoms, medication, and lifestyle habits, 
            you’ll gain a clear picture of your progress over time. This empowers you and 
            your healthcare provider to make timely and informed decisions — improving 
            your long-term wellbeing and quality of life.
          </p>

          <p className="text-gray-600 text-base leading-relaxed italic">
            “Small daily steps make big health changes.” Track consistently. Stay motivated. 
            Live healthier.
          </p>

          <div className="pt-4">
            <Link to="/sign-in">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg shadow-md">
                Get Started / Sign In
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <footer className="mt-10 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Digital Health System — NCD Tracker. All rights reserved.
      </footer>
    </div>
  );
}
