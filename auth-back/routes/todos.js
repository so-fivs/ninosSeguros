const router = require("express").Router();
const Todo = require("../shema/todo");

//se toma de ejemplo un block de notas = se puede tomar como los post
router.get("/", async (req,res) => {
    //recupera las notas guardadas en la bd
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
router.post("/", async (req,res) => {//guarda la nota en la bd
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