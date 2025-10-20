const Patients = require('../models/Patients');

// Utility function to calculate BMI
const calculateBMI = (weight, height) => weight / ((height / 100) ** 2);

// Utility function to generate feedback
const generateFeedback = ({ diseaseType, bloodSugar, bloodPressureSystolic, bloodPressureDiastolic, bmi }) => {
  let feedback = "";

  if (diseaseType === "diabetes" || diseaseType === "both") {
    if (bloodSugar > 180) feedback += "High blood sugar. ";
    else if (bloodSugar < 70) feedback += "Low blood sugar. ";
    else feedback += "Blood sugar is normal. ";
  }

  if (diseaseType === "hypertension" || diseaseType === "both") {
    if (bloodPressureSystolic > 140 || bloodPressureDiastolic > 90)
      feedback += "High blood pressure — consider visiting a doctor. ";
    else feedback += "Blood pressure is normal. ";
  }

  if (bmi >= 25) feedback += "BMI is high — maintain a healthy diet and exercise.";

  return feedback;
};

// Add a new health record
exports.addPatient = async (req, res) => {
  try {
    const { userId, diseaseType, bloodSugar, bloodPressureSystolic, bloodPressureDiastolic, weight, height } = req.body;

    if (!userId || !diseaseType) return res.status(400).json({ message: "userId and diseaseType are required" });

    const bmi = calculateBMI(weight, height);
    const feedback = generateFeedback({ diseaseType, bloodSugar, bloodPressureSystolic, bloodPressureDiastolic, bmi });

    const patient = await Patients.create({ userId, diseaseType, bloodSugar, bloodPressureSystolic, bloodPressureDiastolic, weight, height, bmi, feedback });

    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all records for a user
exports.getPatients = async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};
    const patients = await Patients.find(filter).sort({ createdAt: -1 });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a patient record
exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { diseaseType, bloodSugar, bloodPressureSystolic, bloodPressureDiastolic, weight, height } = req.body;

    const bmi = weight && height ? calculateBMI(weight, height) : undefined;
    const feedback = generateFeedback({ diseaseType, bloodSugar, bloodPressureSystolic, bloodPressureDiastolic, bmi });

    const updated = await Patients.findByIdAndUpdate(
      id,
      { diseaseType, bloodSugar, bloodPressureSystolic, bloodPressureDiastolic, weight, height, bmi, feedback },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Patient record not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a patient record
exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Patients.deleteOne({ _id: id });
    if (result.deletedCount === 0) return res.status(404).json({ message: "Record not found" });
    res.json({ ok: true, message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
