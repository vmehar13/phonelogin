const express = require('express')
const mongoose = require('mongoose');
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');

const Form = require('./models/form');

//=============DATABASE=========================

mongoose.connect("mongodb://localhost:27017/ques2", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB CONNECTED SUCCESFULY");
})

//==============MIDDLE WARE======================

app.use(bodyParser.json());
app.use(cors());

//actual routes

app.post('/api/form', (req, res) => {
    // console.log(req.body)
    Form.findOne({email: req.body.email})
    .then(email => {
        if(email){
            Form.updateOne({name: req.body.name}, 
                // {new: true, useFindAndModify: false},
                (err, form) => {
                if(err){
                    return res.status(400).json({
                        error: "Unable to update data in DB"
                    })
                }
                res.json("Email is already existed. Name updated sucessfully")
            } )
        }
        else{
                const form = new Form(req.body)
                form.save((err, form) => {
                    if(err){
                        return res.status(400).json({
                            error: "Unable to Save Form Details in DB"
                        })
                    }
                    res.json(form)
                })
        }
    })

    //     {$set: req.body},
    //     {new: true, useFindAndModify: false},
    //     (err, form) => {
        
    //     console.log(form)
    //     res.json(form)
    // })
})



//================PORT=========================

const port = 8000;

//===============PORt running===================

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})