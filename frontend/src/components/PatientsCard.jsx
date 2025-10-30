import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PatientsCard({ patients }) {
  if (!patients || patients.length === 0) {
    return (
      <Card className="w-full p-6 text-center text-gray-500">
        No patient records found.
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Patients Records</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-2 border">Disease Type</th>
                <th className="px-4 py-2 border">Blood Sugar</th>
                <th className="px-4 py-2 border">BP (Systolic / Diastolic)</th>
                <th className="px-4 py-2 border">Weight (kg)</th>
                <th className="px-4 py-2 border">Height (m)</th>
                <th className="px-4 py-2 border">BMI</th>
                <th className="px-4 py-2 border">Feedback</th>
                <th className="px-4 py-2 border">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2 border">{patient.diseaseType}</td>
                  <td className="px-4 py-2 border">{patient.bloodSugar}</td>
                  <td className="px-4 py-2 border">
                    {patient.bloodPressureSystolic} / {patient.bloodPressureDiastolic}
                  </td>
                  <td className="px-4 py-2 border">{patient.weight}</td>
                  <td className="px-4 py-2 border">{patient.height}</td>
                  <td className="px-4 py-2 border">{patient.bmi?.toFixed(2) ?? "—"}</td>
                  <td className="px-4 py-2 border text-gray-700 italic">
                    {patient.feedback || "No feedback yet"}
                  </td>
                  <td className="px-4 py-2 border text-gray-500 text-xs">
                    {patient.updatedAt
                      ? new Date(patient.updatedAt).toLocaleString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
