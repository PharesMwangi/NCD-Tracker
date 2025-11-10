import { SignInButton } from "@clerk/clerk-react";
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
            Welcome to <strong>NCD Tracker</strong> — your personal health companion for 
            managing chronic conditions like hypertension, diabetes, and heart disease. 
            Track your health data, monitor trends, and stay on top of your wellbeing.
          </p>

          <p className="text-gray-600 text-base leading-relaxed">
            By consistently logging your blood pressure, BMI, and symptoms, you empower 
            yourself and your healthcare provider with valuable insights — helping prevent 
            complications and supporting better treatment outcomes.
          </p>

          <p className="text-gray-600 text-base italic leading-relaxed">
            “Every record you make today is a step toward a healthier tomorrow.”
          </p>

          <div className="pt-4">
            <SignInButton mode="modal">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg shadow-md">
                Sign In to Get Started
              </Button>
            </SignInButton>
          </div>
        </CardContent>
      </Card>

      <footer className="mt-10 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Digital Health System — NCD Tracker. All rights reserved.
      </footer>
    </div>
  );
}
