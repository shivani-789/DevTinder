const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
},
lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
},
email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
},
password: {
        type: String,
        required: true,
        validate(value) {
            if (!isStrongPassword(value)) {
                throw new Error('Enter a strong password with at least 8 characters, including uppercase, lowercase, number, and special character');
            }
        }
},
age: {
        type: Number,
        required: true
},
gender: {
        type: String,
        required: true,
        validate(value) {
           if (!['male', 'female', 'other'].includes(value)) {
               throw new Error('Gender must be either male, female, or other');
           }
        }
    }
})
const User = mongoose.model('User', userSchema);
module.exports = User;