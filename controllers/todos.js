const ToDo = require('../models/Todo')

module.exports = {
    // get all to-do items
    index: (req, res) => {
        ToDo.find({}, (err, allToDo)=>{
            if(err) throw err;
            res.json(allToDo)
        })
    },
    // get one to-do item
    showOne: (req, res) => {
        let id = req.params.id
        ToDo.findById(id, (err, toDo) => {
            if(err) throw err;
            res.json(toDo)
        })
    },
    //create a to-do item
    create: (req, res) => {
        ToDo.create(req.body, (err, newToDo) => {
            if(err) throw err;
            res.json({status: "Success", message: "To Do Item created", toDo: newToDo})
        })
    },
    // update a to-do item
    update: (req,res) => {
        let id = req.params.id
        ToDo.findById(id, (err, updatedToDo) => {
            if(err) throw err;
            updatedToDo.completed = !updatedToDo.completed
            updatedToDo.save( () => {res.json({status: "Success", message: "To Do Item Updated", toDo: updatedToDo})
            })
        })
    },
    // Destroy a to-do item
    destroy: (req, res) => {
        let id = req.params.id
        ToDo.findByIdAndRemove(id, (err, removedToDo) => {
            if(err) throw err;
            res.json({status: "Success", message: "To Do Deleted"})
        })
    }

}