const express = require('express');
const app = express();

const authRoutes = require('./routes/auth');

//middleware
app.use(express.json()); //body-parser

//route middleware
app.use('/api/user', authRoutes);

app.listen(3000, ()=>{
    console.log('server up....');
});