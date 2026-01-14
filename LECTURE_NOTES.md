# Backend Development: Staff Contributions Management System
## Comprehensive Node.js + Express + MongoDB Tutorial

### Table of Contents
1. [Project Overview & Architecture](#project-overview--architecture)
2. [Environment Setup](#environment-setup)
3. [Database Design & Models](#database-design--models)
4. [Server Configuration](#server-configuration)
5. [API Endpoints Development](#api-endpoints-development)
6. [Testing the API](#testing-the-api)

---

## Project Overview & Architecture

### What We're Building
A RESTful API for managing staff contributions with the following features:
- Employee management (CRUD operations)
- Contribution tracking per employee
- Data relationships between employees and contributions
- Real-time data validation and error handling

### Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Middleware**: CORS, JSON parser
- **Development Tool**: Nodemon for auto-restart

### Project Architecture
```
server/
├── models/
│   ├── Employee.js      # Employee data model
│   └── Contribution.js  # Contribution data model
├── package.json         # Dependencies and scripts
└── index.js            # Main server file with all routes
```

---

## Environment Setup

### Step 1: Initialize Node.js Project

```bash
# Create server directory
mkdir server
cd server

# Initialize package.json
npm init -y
```

### Step 2: Install Dependencies

**Core Dependencies:**
```bash
npm install express mongoose cors
```

**Development Dependencies:**
```bash
npm install nodemon --save-dev
```

### Step 3: Package.json Configuration

**File: `server/package.json`**
```json
{
  "name": "server",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "express": "^5.2.1",
    "mongoose": "^9.0.0",
    "cors": "^2.8.5",
    "nodemon": "^3.1.11"
  }
}
```

**Key Learning Points:**
- `express`: Web framework for building APIs
- `mongoose`: MongoDB object modeling library
- `cors`: Enables cross-origin requests from frontend
- `nodemon`: Auto-restarts server on file changes during development

---

## Database Design & Models

### MongoDB Atlas Setup (Cloud Database)

1. **Create MongoDB Atlas Account**: Visit mongodb.com and create free account
2. **Create Cluster**: Choose free tier (M0 Sandbox)
3. **Create Database User**: Add username/password
4. **Whitelist IP Address**: Allow connections from your IP
5. **Get Connection String**: Copy the connection URI

### Employee Model Design

**File: `server/models/Employee.js`**
```javascript
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,           // Field is mandatory
        trim: true               // Remove whitespace
    },
    department: {
        type: String,
        required: true,
        enum: ['Teaching', 'Cleaning Service', 'Management', 'Security'] // Restricted values
    },
    phone: {
        type: String,
        required: true,
        unique: true            // No duplicate phone numbers
    }
}, { 
    timestamps: true           // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('Employee', EmployeeSchema);
```

**Key Schema Features:**
- **Data Types**: String, Number, Date, Boolean, ObjectId
- **Validation**: `required`, `unique`, `enum` for dropdown options
- **Timestamps**: Automatic `createdAt` and `updatedAt` fields
- **Trim**: Removes leading/trailing whitespace

### Contribution Model Design

**File: `server/models/Contribution.js`**
```javascript
const mongoose = require('mongoose');

const ContributionSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to Employee
        ref: 'Employee',                       // Model to reference
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0                                // Must be positive
    },
    month: {
        type: String,
        required: true
    },
    datePaid: {
        type: Date,
        default: Date.now,                    // Default to current date
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Contribution', ContributionSchema);
```

**Key Relationship Concepts:**
- **ObjectId Reference**: Links to another collection
- **Population**: Allows joining data from referenced collections
- **Default Values**: `Date.now` sets current timestamp
- **Data Validation**: `min` ensures positive amounts

---

## Server Configuration

### Complete Server Setup

**File: `server/index.js`**
```javascript
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

// Import Models
const Employee = require('./models/Employee');
const Contribution = require('./models/Contribution');

const port = 3000;

// Middleware Configuration
app.use(express.json());    // Parse JSON request bodies
app.use(cors());           // Enable cross-origin requests

// Test endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Staff Contributions API is running!' });
});
```

### Database Connection

```javascript
// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://thanni:Damilola@nodetuts.vdoxlrp.mongodb.net/Employee_Contribution?appName=nodetuts';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
```

**Connection Best Practices:**
- Store connection string in environment variables for security
- Handle connection errors gracefully
- Use connection pooling for production
- Monitor connection status

---

## API Endpoints Development

### Employee Management Endpoints

#### 1. Get All Employees
```javascript
app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find({}).sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
```

**Learning Points:**
- `async/await` for asynchronous operations
- `find({})` gets all documents
- `sort({ createdAt: -1 })` sorts by newest first
- Error handling with try-catch

#### 2. Create New Employee
```javascript
app.post('/employees', async (req, res) => {
  const { name, department, phone } = req.body;  // Destructure request body
  
  const newEmployee = new Employee({ 
    name, 
    department, 
    phone 
  });
  
  try {
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);  // 201 = Created
  } catch (error) {
    res.status(400).json({ message: error.message });  // 400 = Bad Request
  }
});
```

**HTTP Status Codes:**
- `200`: Success
- `201`: Created successfully
- `400`: Bad request (validation error)
- `404`: Resource not found
- `500`: Server error

#### 3. Get Single Employee
```javascript
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
```

**Route Parameters:**
- `:id` creates a dynamic route parameter
- Access via `req.params.id`
- Handle invalid ObjectId formats

#### 4. Update Employee
```javascript
app.put('/employees/:id', async (req, res) => {
  const employeeId = req.params.id;
  const updatedData = req.body;
  
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId, 
      updatedData,
      { 
        new: true,          // Return updated document
        runValidators: true // Run schema validation
      }
    );
    
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    res.json({ 
      success: true, 
      message: 'Employee updated successfully',
      data: updatedEmployee 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
```

#### 5. Delete Employee
```javascript
app.delete('/employees/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    // Optional: Also delete related contributions
    await Contribution.deleteMany({ employee: req.params.id });
    
    res.json({ 
      message: 'Employee and related contributions deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
```

### Contribution Management Endpoints

#### 1. Get All Contributions (with Employee Data)
```javascript
app.get('/contributions', async (req, res) => {
  try {
    const contributions = await Contribution.find({})
      .populate('employee')        // Join with Employee collection
      .sort({ createdAt: -1 });
      
    res.json(contributions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
```

**Population Concept:**
- `populate('employee')` replaces ObjectId with actual employee data
- Similar to SQL JOINs
- Can specify which fields to include: `.populate('employee', 'name department')`

#### 2. Create New Contribution
```javascript
app.post('/contributions', async (req, res) => {
  const { amount, month, datePaid, employee } = req.body;
  
  try {
    // Validate that employee exists
    const employeeExists = await Employee.findById(employee);
    if (!employeeExists) {
      return res.status(400).json({ 
        message: 'Employee not found. Please check the employee ID.' 
      });
    }
    
    // Create contribution
    const newContribution = new Contribution({ 
      amount, 
      month, 
      datePaid, 
      employee 
    });
    
    const savedContribution = await newContribution.save();
    
    // Return contribution with employee data populated
    const populatedContribution = await savedContribution.populate('employee');
    
    res.status(201).json(populatedContribution);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
```

**Data Integrity:**
- Always validate foreign key references
- Use transactions for complex operations
- Handle validation errors appropriately

#### 3. Get Contributions by Employee
```javascript
app.get('/contributions/employee/:employeeId', async (req, res) => {
  try {
    const contributions = await Contribution.find({ 
      employee: req.params.employeeId 
    })
    .populate('employee')
    .sort({ datePaid: -1 });  // Sort by payment date
    
    res.json(contributions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
```

#### 4. Get Single Contribution
```javascript
app.get('/contributions/:id', async (req, res) => {
  try {
    const contribution = await Contribution.findById(req.params.id)
      .populate('employee');
      
    if (!contribution) {
      return res.status(404).json({ message: 'Contribution not found' });
    }
    
    res.json(contribution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
```

#### 5. Update Contribution
```javascript
app.put('/contributions/:id', async (req, res) => {
  try {
    const { amount, month, datePaid, employee } = req.body;
    
    // Validate employee exists if updating employee field
    if (employee) {
      const employeeExists = await Employee.findById(employee);
      if (!employeeExists) {
        return res.status(400).json({ 
          message: 'Employee not found. Please check the employee ID.' 
        });
      }
    }
    
    const updatedContribution = await Contribution.findByIdAndUpdate(
      req.params.id,
      { amount, month, datePaid, employee },
      { 
        new: true, 
        runValidators: true 
      }
    ).populate('employee');
    
    if (!updatedContribution) {
      return res.status(404).json({ message: 'Contribution not found' });
    }
    
    res.json(updatedContribution);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
```

#### 6. Delete Contribution
```javascript
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
```

---

## Testing the API

### Using Thunder Client / Postman

#### Test Employee Endpoints:

**1. Create Employee (POST)**
```
URL: http://localhost:3000/employees
Method: POST
Headers: Content-Type: application/json

Body:
{
  "name": "John Doe",
  "department": "Teaching",
  "phone": "+1234567890"
}
```

**2. Get All Employees (GET)**
```
URL: http://localhost:3000/employees
Method: GET
```

**3. Get Single Employee (GET)**
```
URL: http://localhost:3000/employees/[EMPLOYEE_ID]
Method: GET
```

**4. Update Employee (PUT)**
```
URL: http://localhost:3000/employees/[EMPLOYEE_ID]
Method: PUT
Headers: Content-Type: application/json

Body:
{
  "name": "John Smith",
  "department": "Management",
  "phone": "+1234567891"
}
```

**5. Delete Employee (DELETE)**
```
URL: http://localhost:3000/employees/[EMPLOYEE_ID]
Method: DELETE
```

#### Test Contribution Endpoints:

**1. Create Contribution (POST)**
```
URL: http://localhost:3000/contributions
Method: POST
Headers: Content-Type: application/json

Body:
{
  "employee": "[EMPLOYEE_ID]",
  "amount": 5000,
  "month": "January 2024",
  "datePaid": "2024-01-15"
}
```

**2. Get All Contributions (GET)**
```
URL: http://localhost:3000/contributions
Method: GET
```

**3. Get Single Contribution (GET)**
```
URL: http://localhost:3000/contributions/[CONTRIBUTION_ID]
Method: GET
```

**4. Get Contributions by Employee (GET)**
```
URL: http://localhost:3000/contributions/employee/[EMPLOYEE_ID]
Method: GET
```

**5. Update Contribution (PUT)**
```
URL: http://localhost:3000/contributions/[CONTRIBUTION_ID]
Method: PUT
Headers: Content-Type: application/json

Body:
{
  "employee": "[EMPLOYEE_ID]",
  "amount": 6000,
  "month": "February 2024",
  "datePaid": "2024-02-15"
}
```

**6. Delete Contribution (DELETE)**
```
URL: http://localhost:3000/contributions/[CONTRIBUTION_ID]
Method: DELETE
```

This comprehensive backend guide covers all aspects of your staff contributions API, from basic setup to advanced API development with practical examples from your actual codebase.