const router = require("express").Router();

router.get("/", (req,res) => {
    res.json([
        {
            id: 1,
            title: "Jhon Doe",
            completed: false,
        },
    ]);
});

module.exports = router;