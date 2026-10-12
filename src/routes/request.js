const express = require('express');
const router = express.Router();
const ConnectionRequest = require('../models/connectionRequest');
const { authMiddleware } = require('../middlwares/auth');



router.post('/connection-request/send/:status/:toUserId', authMiddleware, async (req, res) => {
    try {
        const { toUserId } = req.params.toUserId; // Get the toUserId from the request body
        const fromUserId = req.user._id;    
        const status = req.params.status // Default status for a new connection request

   
        const allowedStatuses = ['ignored', 'accepted', 'intrested', 'rejected'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).send({ error: 'Invalid status value' });
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status // Set the default status to 'pending'
        });
       const data =  await connectionRequest.save();
       res.status(200).send({ message: 'Connection request sent successfully', data });
    } catch (error) {
        res.status(500).send({ error: 'Failed to send connection request' });
    }   res.status(200).send({ message: 'Connection request sent successfully' });
});


module.exports = router;