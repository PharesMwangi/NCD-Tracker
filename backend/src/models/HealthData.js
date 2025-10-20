const mongoose = require('mongoose');

//define schema
const patientSchema = new mongoose.Schema({
    userId : { type: String, index: true},  //frontend passes it
    deseaseType: {type: String, enum: ['hypertension', 'diabetes', 'both'], required: true},
    bloodSugar: { type: Number, required: true},
    bloodPressureSystolic: {type: Number, required: true},
    bloodPressureDiastolic: {type: Number, required: true},
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    bmi: { type: Number, required: true },
    feedback: { type: String},
}, {timestamps: true});

//create model
const Patients = mongoose.model("Patients", patientSchema);

module.exports = Patients;