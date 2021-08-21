const { Schema, model } = require('mongoose');

const ReviewSchema = new Schema({
        author: {
            type: String,
            required: true,
            trim: true
        },
        reviewBody: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
});

const Review = model('Review', ReviewSchema);

module.exports = Review;