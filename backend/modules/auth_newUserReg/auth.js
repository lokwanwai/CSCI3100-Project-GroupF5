const path = require('path');
const Session = require('../../models/cookies');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const jwt = require('jsonwebtoken');

// const Session = require('./cookies');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403);
        
        const session = await Session.findOne({ token: token });
        if (!session || session.expiresAt < new Date()) {
            return res.sendStatus(401); // Session not found or expired
        }

        req.user = user;
        next();
    });
};


module.exports = { authenticateToken };
