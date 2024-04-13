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
    if (req.user.roles.includes("admin")) {
        res.json({ isAdmin: true, message: "You are an admin!" });
    } else {
        res.status(403).json({ isAdmin: false, message: "Access denied. Not an admin." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
