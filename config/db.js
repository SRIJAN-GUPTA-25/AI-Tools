const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Connected to MongoDB Database ${mongoose.connection.host}`.bgGreen.white);

    }
    catch (error) {
        console.log(error);
    }
}
module.exports = connectDB;