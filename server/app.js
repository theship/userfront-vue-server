const express = require('express');
const cors = require('cors');
const authenticateToken = require('./authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS
app.use(cors({
    origin: 'http://localhost:5173',  // This should match the URL and port of your Vue app
    optionsSuccessStatus: 200  // Some legacy browsers choke on status 204
}));

app.use(express.json());

app.get('/admin-endpoint', authenticateToken, (req, res) => {
    // Check if the user has 'admin' role
    if (req.user.roles.includes("admin")) {
        // Send back isAdmin status, tenantId, and roles
        res.json({
            isAdmin: true,
            message: "You are an admin!",
            tenantId: req.user.tenantId,  // Include tenantId
            roles: req.user.roles          // Include roles array
        });
    } else {
        res.status(403).json({
            isAdmin: false,
            message: "Access denied. Not an admin.",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
