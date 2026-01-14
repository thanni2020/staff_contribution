const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const Employee = require('./models/Employee');
const Contribution = require('./models/Contribution');
const port = 3000;

app.use(express.json());
app.use(cors());

// EMPLOYEE ENDPOINTS

app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/employees', async (req, res) => {
  const { name, department, phone } = req.body;
  const newEmployee = new Employee({ name, department, phone });
  try {
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/employees/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update contact
app.put('/employees/:id', async (req, res) => {
    const employeeId = req.params.id; // Get employee ID from URL parameter
    const updatedData = req.body;
    await Employee.findByIdAndUpdate(employeeId, updatedData);
    res.json({ success: true, message: 'Employee updated successfully' });
});

// CONTRIBUTION ENDPOINTS

// Get all contributions (with employee details populated)
app.get('/contributions', async (req, res) => {
  try {
    const contributions = await Contribution.find({}).populate('employee');
    res.json(contributions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new contribution
app.post('/contributions', async (req, res) => {
  const { amount, month, datePaid, employee } = req.body;
  
  try {
    // Check if employee exists
    const employeeExists = await Employee.findById(employee);
    if (!employeeExists) {
      return res.status(400).json({ message: 'Employee not found. Please check the employee ID.' });
    }
    
    // If employee exists, create the contribution
    const newContribution = new Contribution({ amount, month, datePaid, employee });
    const savedContribution = await newContribution.save();
    const populatedContribution = await savedContribution.populate('employee');
    res.status(201).json(populatedContribution);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get contributions by employee ID
app.get('/contributions/employee/:employeeId', async (req, res) => {
  try {
    const contributions = await Contribution.find({ employee: req.params.employeeId }).populate('employee');
    res.json(contributions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single contribution by ID
app.get('/contributions/:id', async (req, res) => {
  try {
    const contribution = await Contribution.findById(req.params.id).populate('employee');
    if (!contribution) {
      return res.status(404).json({ message: 'Contribution not found' });
    }
    res.json(contribution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a contribution
app.put('/contributions/:id', async (req, res) => {
  try {
    const { amount, month, datePaid, employee } = req.body;
    
    // Check if employee exists (if employee is being updated)
    if (employee) {
      const employeeExists = await Employee.findById(employee);
      if (!employeeExists) {
        return res.status(400).json({ message: 'Employee not found. Please check the employee ID.' });
      }
    }
    
    const updatedContribution = await Contribution.findByIdAndUpdate(
      req.params.id,
      { amount, month, datePaid, employee },
      { new: true, runValidators: true }
    ).populate('employee');
    
    if (!updatedContribution) {
      return res.status(404).json({ message: 'Contribution not found' });
    }
    
    res.json(updatedContribution);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a contribution
app.delete('/contributions/:id', async (req, res) => {
  try {
    const deletedContribution = await Contribution.findByIdAndDelete(req.params.id);
    if (!deletedContribution) {
      return res.status(404).json({ message: 'Contribution not found' });
    }
    res.json({ message: 'Contribution deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose.connect('mongodb+srv://thanni:Damilola@nodetuts.vdoxlrp.mongodb.net/Employee_Contribution?appName=nodetuts')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});