import mongoose from 'mongoose';

export default new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    client: {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        finishDate: {
            type: String,
            required: false,
        },
        productColor: {
            type: String,
            required: false,
        }
    },
    labels: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Label'
    }],
    image: {
        type: String,
        required: true,
    },
    pageLocation: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date
});