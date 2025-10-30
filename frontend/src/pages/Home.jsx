import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <Card className="max-w-md w-full text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Welcome to Smart Health Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Track and manage your health data with ease.
          </p>
          <Button className='bg-blue-600 hover:bg-blue-700' onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
