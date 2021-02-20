const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
const CourseSchema = new Schema(
    {
        _id: { type: Number },
        name: {
            type: String,
            maxlength: 255,
            required: true,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
        },
        videoId: {
            type: String,
            required: true,
        },
        level: {
            type: String,
        },
        slug: {
            type: String,
            slug: 'name',
            unique: true,
        },
        //slug này lấy tên field/attribute name để làm slug trên thanh URL
    },
    //Options khác
    {
        _id: false, //Thêm trường này để mongo không can thiệp vào trường _id nữa
        timestamps: true,
    },
);
// Custom query helpers
CourseSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['desc', 'asc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
};
CourseSchema.plugin(AutoIncrement);

//Add plugins
mongoose.plugin(slug);
CourseSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});
module.exports = mongoose.model('Course', CourseSchema);
