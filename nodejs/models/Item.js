const mongoose = require('mongoose'),
    slug = require('slug');

mongoose.Promise = global.Promise;
const schema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    slug: String,
    body: {
        type: String,
        trim: true,
        required: true
    },
    tags: {
        type: String,
        trim: true,
        required: true
    },
    time: String
});

schema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = slug(this.title, { lower: true });
    }

    next();
});

module.exports = mongoose.model('Item', schema);
