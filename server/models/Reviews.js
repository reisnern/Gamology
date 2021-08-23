const { Schema, model } = require('mongoose');

const ReviewSchema = new Schema({
        author: {
            type: String
        },
        reviewBody: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
});

const Review = model('Review', ReviewSchema);

module.exports = Review;