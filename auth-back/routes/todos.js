const router = require("express").Router();
const Todo = require("../shema/todo");

router.get("/", async (req,res) => {
    try{
        const todos = await Todo.find({idUser: req.user.id})
        if (todos){
            res.json(todos);
        }else{
            return res.status(404).json({error : "No se encuentran publicaciones"})
        }
    }catch (e) {
        console.log(e);
    }
});
router.post("/", async (req,res) => {
    if (!req.body.title){
        return res.status(200).json({error : "Se necesita titulo"})
    }
    try {
        const todo = new Todo({
            idUser: req.user.id,
            title: req.body.title,
            completed: false,
        });

        const newTodo = await todo.save();
        res.json(newTodo);

    }catch (e) {
        console.log(e);
    }

});

module.exports = router;