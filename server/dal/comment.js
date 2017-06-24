const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    updatedAt: Date,
    comment: String,
    email: String,
    rate: Number,
    ratingHits: Number
});

module.exports = mongoose.model('Comment', commentSchema);

