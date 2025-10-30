import { useEffect, useState } from "react";
import { PatientsAPI } from "../lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useUser } from "@clerk/clerk-react";

export default function Insights() {
  const { user, isLoaded } = useUser();
  const [patients, setPatients] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  // Fetch only current user's data
  useEffect(() => {
    if (!isLoaded || !user) return;

    (async () => {
      try {
        setStatus("loading");
        const userId = user.id; // Clerk user ID
        const data = await PatientsAPI.list(userId);
        const sorted = data.sort(
          (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
        );
        setPatients(sorted);
        setStatus("success");
      } catch (e) {
        console.error("Error fetching insights:", e);
        setError(e.message);
        setStatus("error");
      }
    })();
  }, [isLoaded, user]);

  if (status === "loading") return <p className="p-4">Loading insights...</p>;
  if (status === "error") return <p className="text-red-600 p-4">{error}</p>;
  if (!user)
    return <p className="p-4 text-gray-600">Please sign in to view insights.</p>;
  if (patients.length === 0)
    return (
      <p className="p-4 text-gray-600">
        No records yet, {user.firstName || "User"}! Add some in your dashboard.
      </p>
    );

  return (
    <div className="mx-auto max-w-6xl p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        {user.firstName ? `${user.firstName}'s Health Insights` : "Health Insights"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Blood Pressure Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Blood Pressure Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={patients}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="updatedAt"
                  tickFormatter={(v) => new Date(v).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(v) => new Date(v).toLocaleString()}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="bloodPressureSystolic"
                  stroke="#ef4444"
                  name="Systolic"
                />
                <Line
                  type="monotone"
                  dataKey="bloodPressureDiastolic"
                  stroke="#3b82f6"
                  name="Diastolic"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* BMI Chart */}
        <Card>
          <CardHeader>
            <CardTitle>BMI Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={patients}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="updatedAt"
                  tickFormatter={(v) => new Date(v).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(v) => new Date(v).toLocaleString()}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="bmi"
                  stroke="#22c55e"
                  name="BMI"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
