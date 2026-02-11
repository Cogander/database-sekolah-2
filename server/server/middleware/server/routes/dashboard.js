const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, (req, res) => {
    res.json({
        siswa: 653,
        guru: 108,
        pengurus: 78,
        total: 839
    });
});

module.exports = router;
