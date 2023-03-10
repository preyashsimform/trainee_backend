require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const student = require('./model/model');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())
const URI = process.env.MONGODB_URL;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected..")
}).catch(() => {
    console.log("error", err)
});

app.get('/students', async (req, res) => {
    try{
        const students = await student.find();
        res.json(students); 
    } catch (err) {
        return res.status(500);
    }

});

app.delete('/delete-student/:id', async (req, res) => {
    try{
        var id=req.params.id;
        console.log(id)
        const res = await student.findByIdAndRemove(id);
        return res.status(200);
    } catch (err) {
        return res.status(500);
    }

});

app.put('/update-student/:id', async (req, res) => {
    try{
        const { name, email, rollno } = req.body;
        const students = await student.findByIdAndUpdate({_id:req.params.id},{Name:name, Email:email, Roll:rollno});
        console.log(students);
        res.status(200).json(students);
    } catch (err) {
        return res.status(500);
    }

});

app.post("/create-student", async (req, res, next) => {
    try {
        const { name, email, rollno } = req.body;
        const newstudent = new student({
            Name:name, Email:email, Roll:rollno
        })
        await newstudent.save();
        return res.status(200);
    } catch (error) {
        console.log("error");
    }
});



PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

