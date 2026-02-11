const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const router = express.Router();

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await pool.query(
        "SELECT * FROM users WHERE username=$1",
        [username]
    );

    if(user.rows.length === 0)
        return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.rows[0].password);

    if(!valid)
        return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
        { id: user.rows[0].id },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
    );

    res.json({ token });
});

module.exports = router;
