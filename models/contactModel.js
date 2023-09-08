const mongoose = require('mongoose');

const contactModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Contact = mongoose.model('Contact', contactModel);

module.exports = Contact;
