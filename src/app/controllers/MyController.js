const Course = require('../models/Course');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../utils/mongoose');
class MyController {
    //[GET] /my/stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted({})])
            .then(([courses, deletedCount]) => {
                res.render('my/stored-courses', {
                    deletedCount,
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);

        // Course.countDocumentsDeleted().then(deletedCount => {
        //     console.log(deletedCount);
        // }).catch(() => {

        // });

        // Course.find({})
        //     .then((courses) => {
        //         res.render('my/stored-courses', {
        //             courses: multipleMongooseToObject(courses),
        //         });
        //     })
        //     .catch(next);
    }
    //[GET] /my/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) => {
                res.render('my/trash-courses', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}
module.exports = new MyController();
