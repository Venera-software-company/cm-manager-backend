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
        orderDate: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
        expectedEndDate: {
            type: String,
            required: false,
        },
        furnitureColorVariant: {
            type: String,
            required: false,
        },
        typeOfHousing: {
            type: String,
            required: false,
        },
        daysThatCanWork: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
    },
    labels: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Label'
    }],
    furnitureDraw: {
        type: String,
        required: true,
    },
    pageLocation: {
        type: String,
        required: false,
    },
    contract: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date
});