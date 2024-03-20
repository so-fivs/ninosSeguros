const router = require("express").Router();
const jsonResponse = require("../lib/jsonResponse");

router.get("/", (req,res) => {
    const reqUser = req.user;
    res.status(200).json({reqUser});
});

module.exports = router;