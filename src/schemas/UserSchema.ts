import mongoose from 'mongoose';

export default new mongoose.Schema({
    user: {
        type: String,
        required: true,
    }, 
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    settings: {
        theme: {
            type: String,
            required: false
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date
});