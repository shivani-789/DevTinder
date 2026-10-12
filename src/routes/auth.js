const express = require("express")
const authRouter = express.Router();
const User = require("../models/user")

authRouter.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        const passwordHash = await bcrypt.hash(user.password, 10);
        user.password = passwordHash;
        await user.save();
        res.send('User created successfully');
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});


module.exports = authRouter;