require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

//=============MY-ROUTES======================

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

//=============DATABASE=========================

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB CONNECTED SUCCESFULY");
})

//==============MIDDLE WARE======================

app.use(bodyParser.json());
app.use(cors());

//==============ROUTES==========================

app.use("/api", authRoutes);
app.use("/api", userRoutes);

//================PORT=========================

const port = process.env.PORT || 8000;

//===============PORt running===================

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})