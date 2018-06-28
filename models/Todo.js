const
    mongoose = require('mongoose')
    toDoSchema = new mongoose.Schema({
        body: String,
        completed: {type: Boolean, default: false}
    }, { timestamps: true})

const ToDo = mongoose.model('ToDo', toDoSchema)

module.exports = ToDo
// the Todo schema should contain the following fields:
// 1. body, which is a string
// 2. completed, which is a boolean that defaults to false
// in addition: the todo schema should also store timestamps for createdAt and updatedAt