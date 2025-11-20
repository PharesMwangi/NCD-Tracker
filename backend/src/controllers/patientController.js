const Patients = require('../models/HealthData');

// Utility function to calculate BMI
const calculateBMI = (weight, height) => weight / ((height / 100) ** 2);

// Utility function to generate feedback
const generateFeedback = ({ diseaseType, bloodSugar, bloodPressureSystolic, bloodPressureDiastolic, bmi }) => {
  let feedback = "";

  // --- Diabetes feedback ---
  if (diseaseType === "diabetes" || diseaseType === "both") {
    if (bloodSugar > 180) {
      feedback += "Your blood sugar is high — consider reducing sugary foods and consult your doctor. ";
    } else if (bloodSugar < 70) {
      feedback += "Your blood sugar is low — ensure you eat regularly and monitor for dizziness. ";
    } else {
      feedback += "Your blood sugar is within a healthy range ";
    }
  }

  // --- Hypertension feedback ---
  if (diseaseType === "hypertension" || diseaseType === "both") {
    if (bloodPressureSystolic > 140 || bloodPressureDiastolic > 90) {
      feedback += "Your blood pressure is high — reduce salt intake, avoid stress, and consider seeing a doctor. ";
    } else if (bloodPressureSystolic < 90 || bloodPressureDiastolic < 60) {
      feedback += "Your blood pressure is low — stay hydrated and consult a doctor if you feel weak or dizzy. ";
    } else {
      feedback += "Your blood sugar is within a healthy range — keep monitoring regularly. ";
    }
  }

  // --- BMI feedback ---
  if (bmi) {
    if (bmi >= 30) {
      feedback += "Your BMI indicates you are overweight — aim for a balanced diet and consistent physical activity. ";
    } else if (bmi < 18.5) {
      feedback += "Your BMI indicates you are underweight — consider nutrient-rich foods and speak to a nutritionist. ";
    } else {
      feedback += "Your BMI is normal — great job! Continue eating well and staying active. ";
    }
  }

  // --- Final encouragement ---
  feedback += "Remember to track your readings regularly for better health management.";

  return feedback;
};

// Add a new health record
exports.addPatient = async (req, res) => {
  try {
    const { userId, diseaseType, bloodSugar, bloodPressureSystolic, bloodPressureDiastolic, weight, height } = req.body;

    if ( !diseaseType) return res.status(400).json({ message: "userId and diseaseType are required" });

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
