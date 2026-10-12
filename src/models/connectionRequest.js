const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({   
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    status: {
        type: String,   
    },  
    enum: {
        values: ['ignored', 'accepted', 'intrested', 'rejected'],
        message: '{VALUE} is not a valid status'
    },
});

const ConnectionRequest = mongoose.model('ConnectionRequest', connectionRequestSchema); 
