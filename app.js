const express = require('express');
const connectionDb = require('./src/config/dbconnection');
const app = express();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const bcrypt = require('bcrypt');
const User = require('./src/models/user');
const jwt = require('jsonwebtoken');
// const secretKey = 'devtinder45678910'; // Replace
const cookieParser = require('cookie-parser');
const {authMiddleware} = require('./src/middlwares/auth');



require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

console.log("Secret exists:", !!secretKey);

app.use(express.json());

app.use(cookieParser());


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }); 
        if (!user) {
            return res.status(404).send('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);

        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
        console.log('Generated JWT:', token); // Log the generated token
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }
        res.cookie("token", token);
        res.send('Login successful');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get('/users', async (req, res) => {
    const UserEmail = req.body.email;
    const users = await User.find({ email: UserEmail });
    res.send(users);
});

app.patch('/users', async (req, res) => {
    try {
       const { id, ...data } = req.body;
      const AllowedUpdates = ['id','firstName', 'lastName', 'email', 'password', 'age', 'gender'];
      const updates = Object.keys(data);
      const isValidOperation = updates.every((update) => AllowedUpdates.includes(update));
      const findUser = await User.findByIdAndUpdate(id, data, {  returnDocument: "after" , runValidators: true });
      if (!isValidOperation) {
          return res.status(400).send({ error: 'Invalid updates!' });
      }
      console.log('Updated user:', findUser);
      res.send(findUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get('/profile', authMiddleware, async (req, res) => {
    try {
          const user = req.user;
          console.log('Retrieved user profile:', user);
          res.send(user);
       
    }
    catch (error) {
        res.status(400).send("Error message",error.message);
    }
})
                                                                                                    











connectionDb().then(()=>{
    console.log('Database connected successfully');
    app.listen(3000, () => {

        console.log('Server is running on port 3000');
    });
}).catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
});