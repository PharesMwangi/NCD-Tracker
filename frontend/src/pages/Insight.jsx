import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

export default function Insight() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="max-w-3xl mx-auto shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Health Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Analytics and trends based on your recorded health data will appear
            here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
