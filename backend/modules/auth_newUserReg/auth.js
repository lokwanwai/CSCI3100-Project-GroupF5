const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
