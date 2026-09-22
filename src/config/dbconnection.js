const mongoose = require('mongoose');
const connectDb = async () => {
    await mongoose.connect(
        "mongodb+srv://Tinder:Tinder12345@cluster0.giujjuw.mongodb.net/DevTinder?retryWrites=true&w=majority&appName=Cluster0"
    );
};
//  connectDb().then(()=>{
//     console.log('Database connected successfully');
//  }  ).catch((error) => {
//     console.error('Database connection failed:', error);
//     process.exit(1);
// })

module.exports = connectDb;