const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;
const Course = new Schema(
    {
        name: { type: String, maxlength: 255, required: true },
        description: { type: String },
        videoId: { type: String, required: true },
        level: { type: String },
        image: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        //slug này lấy tên field/attribute name để làm slug trên thanh URL
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Course', Course);
