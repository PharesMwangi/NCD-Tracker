const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Get all records for a user
router.get('/', patientController.getPatients);

// Add a new patient record
router.post('/', patientController.addPatient);

// Update a patient record
router.put('/:id', patientController.updatePatient);

// Delete a patient record
router.delete('/:id', patientController.deletePatient);

module.exports = router;
