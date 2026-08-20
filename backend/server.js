const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

// Home/API test
app.get("/api", (req, res) => {
    res.json({
        message: "CareerBridge Backend is running!"
    });
});

// Get internships
app.get("/api/internships", (req, res) => {
    const internships = [
        {
            id: 1,
            company: "TCS",
            role: "Software Developer Intern",
            location: "Chennai",
            stipend: "₹20,000/month"
        },
        {
            id: 2,
            company: "Infosys",
            role: "Web Development Intern",
            location: "Bangalore",
            stipend: "₹18,000/month"
        },
        {
            id: 3,
            company: "Wipro",
            role: "Java Developer Intern",
            location: "Hyderabad",
            stipend: "₹15,000/month"
        }
    ];

    res.json(internships);
});

// Simple application API
app.post("/api/apply", (req, res) => {
    const { name, email, internship } = req.body;

    if (!name || !email || !internship) {
        return res.status(400).json({
            message: "Please provide name, email and internship."
        });
    }

    res.json({
        success: true,
        message: `${name}, your application for ${internship} has been submitted!`
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`CareerBridge backend running on http://localhost:${PORT}`);
});