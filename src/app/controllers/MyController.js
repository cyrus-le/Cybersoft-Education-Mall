const Course = require('../models/Course');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../utils/mongoose');
class MyController {
    //[GET] /my/stored/courses
    storedCourses(req, res, next) {
        Course.find()
            .then((courses) => {
                res.render('my/stored-courses', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}
module.exports = new MyController();
