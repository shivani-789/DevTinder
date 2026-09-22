const express = require('express');
const connectionDb = require('./src/config/dbconnection');
const app = express();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const User = require('./src/models/user');



app.post('/signup', async (req, res) => {
    const  user = new User({
        firstName: "Shivani",
        lastName:"Rathore",
        email:"rathoreshivi543@gmail.com",
        password:"shivani123",
        gender:"female",
        age:28,
    })
    await user.save();
    res.send('User created successfully');
});

connectionDb().then(()=>{
    console.log('Database connected successfully');
    app.listen(3000, () => {

        console.log('Server is running on port 3000');
    });
}).catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
});