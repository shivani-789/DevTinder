const express = require('express');
const connectionDb = require('./src/config/dbconnection');
const app = express();
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const User = require('./src/models/user');

app.use(express.json());



app.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send('User created successfully');
    }
    catch (error) {
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

connectionDb().then(()=>{
    console.log('Database connected successfully');
    app.listen(3000, () => {

        console.log('Server is running on port 3000');
    });
}).catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
});