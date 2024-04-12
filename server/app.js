const express = require('express');
const app = express();
const authenticateToken = require('./authMiddleware');

app.use(express.json());

app.get('/protected-route', authenticateToken, (req, res) => {
    const tenantId = 'demo1234'; // Assuming you know the tenant ID you want to check roles for
    if (req.auth && req.auth.authorization && req.auth.authorization[tenantId] && req.auth.authorization[tenantId].roles.includes("admin")) {
        console.log("User is an admin");
    } else {
        console.log("User is not an admin");
    }
    res.send("This is a protected route");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
