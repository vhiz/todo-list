const router = require('express').Router()
const verified = require('./verify')
const bcrypt = require('bcrypt')
const User = require('../models/User')
router.put('/:id',verified ,async(req, res)=>{
    if(req.body.password){
        try{
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }catch(err){
            return res.status(400).send(err)
        }
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        })
        return res.status(200).send(updatedUser);
    } catch (error) {
       return res.status(400).send(error)
    }
})


router.delete('/del/:id', verified, async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id)
        res.status(200).send('account deleted')
    } catch (error) {
        res.status(400).send(error)
    }
})



module.exports= router