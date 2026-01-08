import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

export default function NewPatientsDialog({onCreate}){
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        diseaseType: "", 
        bloodSugar: "", 
        bloodPressureSystolic: "", 
        bloodPressureDiastolic: "", 
        weight: "", 
        height: ""});

    function submit(e){
        e.preventDefault();
        if(!form.diseaseType.trim()) return;
        onCreate(form).then(()=>{setForm ({
            diseaseType: "", 
            bloodSugar: "", 
            bloodPressureSystolic: "", 
            bloodPressureDiastolic: "", 
            weight: "", 
            height: ""}); setOpen(false);
            });
    }
    return(
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <Button className="bg-slate-500 hover:bg-slate-600">New Record</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
                <Dialog.Content className="fixed left-1/2 top-1/2 w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-4 shadow-xl z-50">
                    <Dialog.Title className='text-lg font-semibold mb-2' >Create Record</Dialog.Title>
                    <form onSubmit={submit} className="space-y-3">
                        <select className="w-full border rounded-md p-2" name="diseaseType" value={form.diseaseType} onChange={e=>setForm({...form, diseaseType:e.target.value})} required>
                            <option value="">Select Disease type</option>
                            <option value="diabetes">Diabetes</option>
                            <option value="hypertension">Hypertension</option>
                            <option value="both">Both</option>
                        </select>
                        <Input placeholder="BloodSugar" value={form.bloodSugar} onChange={e=>setForm({...form, bloodSugar:e.target.value})} />
                        <Input placeholder="bloodPressure-Systolic" value={form.bloodPressureSystolic} onChange={e=>setForm({...form, bloodPressureSystolic:e.target.value})} />
                        <Input placeholder="bloodPressure-Diastolic" value={form.bloodPressureDiastolic} onChange={e=>setForm({...form, bloodPressureDiastolic:e.target.value})} />
                        <Input placeholder="weight" value={form.weight} onChange={e=>setForm({...form, weight:e.target.value})} />
                        <Input placeholder="height" value={form.height} onChange={e=>setForm({...form, height:e.target.value})} />
                        <div className="flex gap-2">
                            <Button type='submit'>Add</Button>
                            <Button type="button" className="bg-slate-600 hover:bg-slate-700" onClick={()=>setOpen(false)}>Cancel</Button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}