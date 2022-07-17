const Todo = require('../models/Todo')


const router = require('express').Router()

router.post('/newt',  async (req, res) => {
    const newtodo = new Todo(req.body)
    try {
        const saved = await newtodo.save()
        res.status(200).send(saved)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.put('/to/:id',async (req, res) => {
    try {
        const update = await Todo.findByIdAndUpdate(req.params.id, {
            $set:req.body
        });
        res.status(200).send(update)
    } catch (error) {
        res.status(400).send(error)
    }
})




router.delete('/to/:id',async (req, res) => {
    try {
        const deleted = await Todo.findByIdAndDelete(req.params.id)
        res.status(200).send('Deleted')
    } catch (error) {
        res.status(400).send(error)
    }
})



module.exports= router