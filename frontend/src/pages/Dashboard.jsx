import { useEffect, useState } from "react";
import { PatientsAPI } from "../lib/api";
import NewPatientsDialog from "../components/NewPatientsDialog";
import PatientsCard from "../components/PatientsCard";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function Dashboard({ frontendUserId }) {
  const [patients, setPatients] = useState([]);
  const [ status, setStatus ] = useState("idle");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(()=> {
    (async () => {
      try {
        setStatus("loading");
        const data = await PatientsAPI.list(frontendUserId);
        setPatients(data);
        setStatus("success");
      } catch (e) { setError(e.message); setStatus("error"); }
    })();
  }, [frontendUserId]);

  async function createPatient(payload) {
    const created = await PatientsAPI.create({ 
    ...payload, 
    userId: frontendUserId 
    });
    setPatients(prev => [created, ...prev]);
  }

  async function savePatient(id, payload) {
    const updated = await PatientsAPI.update(id, payload);
    setPatients(prev => prev.map(n => n._id === id ? updated : n));
  }
  async function deletePatient(id) {
    await PatientsAPI.remove(id);
    setPatients(prev => prev.filter(n => n._id !== id));
  }

  return (
    <div className="mx-auto max-w-5xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {/* {user ? `${user.firstName}'s Notes` : "Your Notes"} */}
        </h2>
        <NewPatientsDialog onCreate={createPatient} />
      </div>

      {status === "loading" && <p>Loading…</p>}
      {status === "error" && <p className="text-red-600">Error: {error}</p>}
      {status === "success" && patients.length === 0 && <p>No Record yet. Create your first note!</p>}

      <div className="grid gap-3">
        {patients.map(n => (
          <PatientsCard key={n._id} patient={n} onSave={savePatient} onDelete={deletePatient} />
        ))}
      </div>
    </div>
  );
}

  // Load records on mount
  // useEffect(() => {
  //   fetchPatients();
  // }, []);

  // async function fetchPatients() {
  //   try {
  //     setLoading(true);
  //     const data = await PatientsAPI.list(); // optionally pass userId
  //     setPatients(data);
  //   } catch (err) {
  //     console.error(err);
  //     setError("Failed to load records");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // async function handleCreate(formData) {
  //   try {
  //     const newRecord = await PatientsAPI.create(formData);
  //     setPatients([newRecord, ...patients]);
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to create record");
  //   }
  // }

  // async function handleDelete(id) {
  //   try {
  //     await PatientsAPI.delete(id);
  //     setPatients(patients.filter((p) => p._id !== id));
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to delete record");
  //   }
  // }

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-semibold">Dashboard</h1>
//         <NewPatientsDialog create={handleCreate} />
//       </div>

//       {loading ? (
//         <p>Loading records...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : patients.length === 0 ? (
//         <Card className="p-4 text-center text-gray-500">
//           No records yet. Click “New Record” to add one.
//         </Card>
//       ) : (
//         <PatientsCard patients={patients} onDelete={handleDelete} />
//       )}
//     </div>
//   );
// }
