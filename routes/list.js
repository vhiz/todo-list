const List = require('../models/List')
const Todo = require('../models/Todo')

const router = require('express').Router()

router.post('/newl/:todoid', async (req, res) => {
    const todoId = req.params.todoid
    const newlist = new List(req.body)
    try {
        const saved = await newlist.save()
        try {
            await Todo.findByIdAndUpdate(todoId, {
                $push:{list:saved._id}
            })
        } catch (error) {
            res.status(400).send(error)
        }
        res.status(200).send(saved)
    } catch (error) {
        res.status(400).send(error)
    }
})



router.put('/:listid', async (req, res) => {
 try {
       const update = await List.findOneAndUpdate(req.params.listid, {
        $set:req.body
    })
    res.status(200).send(update)
 } catch (error) {
    res.status(400).send(error)
 }
})



router.delete('/:listid/:todoid', async (req, res) => {
    const todoId = req.params.todoid
    try {
        await List.findByIdAndUpdate(req.params.listid)
        try {
            await Todo.findByIdAndUpdate(todoId, {
                $pull:{list:req.params.listid}
            })
        } catch (error) {
            res.status(400).send(error)
        }
        res.status(200).send('deleted')
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/all', verifiedAuth, async(req, res)=>{
    try{
        const users= await List.find();
        res.status(200).send(users)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router