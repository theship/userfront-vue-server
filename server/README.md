Create a sample Node+Express server:

## Install a server

From main project file:

> mkdir server
> cd server
> npm init -y

> npm install express dotenv 

## Install Userfront

> npm install @userfront/toolkit --save

## Create a server app

Create a "server/app.js" file and populate it with the following code:

```
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authenticateToken = require('./authMiddleware');
app.use(authenticateToken);

app.get("/users", (req, res) => {
    const authorization = req.auth.authorization["demo1234"] || {};

    if (authorization.roles.includes("admin")) {
        console.log("User is an admin");
    } else {
        console.log("User is not an admin");
    }
});
```

```

