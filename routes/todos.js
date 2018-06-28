const
    express = require('express'),
    toDoRouter =  new express.Router(),
    toDoCtrl = require('../controllers/todos.js')

toDoRouter.get('/', toDoCtrl.index)
toDoRouter.get('/:id', toDoCtrl.showOne)
toDoRouter.post('/', toDoCtrl.create)
toDoRouter.delete('/:id', toDoCtrl.destroy)
toDoRouter.patch('/:id', toDoCtrl.update)

module.exports = toDoRouter