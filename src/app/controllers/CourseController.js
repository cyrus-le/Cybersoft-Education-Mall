const Course = require('../models/Course');

const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../utils/mongoose');
class CourseController {
    //[GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({
            slug: req.params.slug, //slug là attribute ở trong mongodb
            // _id: req.params.slug: _id là attribute ở trong mongodb
        })
            .then((course) =>
                res.render('courses/show', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }
    //[GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[POST] /courses/store
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;

        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/my/stored/courses'))
            .catch(next);

        // res.send('Success');
    }
    //[GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) => {
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }
    //[PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne(
            {
                _id: req.params.id,
            },
            req.body,
        )
            .then(() => {
                res.redirect('/my/stored/courses/');
            })
            .catch(next);
    }
    //[DELETE] /courses/:id
    destroy(req, res, next) {
        //deleteOne() này là function của mongoose
        // Course.deleteOne({
        //     _id: req.params.id
        // })

        //delete() này là funtion của plugin mongoose-delete
        Course.delete({
            _id: req.params.id,
        })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
    //[PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({
            _id: req.params.id,
        })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
    //[DELETE] /courses/:id/forceDelete
    forceDestroy(req, res, next) {
        Course.deleteOne({
            _id: req.params.id,
        })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
    //[POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({
                    _id: {
                        $in: req.body.courseIds,
                    },
                })
                    .then(() => {
                        res.redirect('back');
                    })
                    .catch(next);
                break;
            case 'delete-permanent':
                Course.deleteMany({
                    _id: {
                        $in: req.body.courseIds,
                    },
                })
                    .then(() => {
                        res.redirect('back');
                    })
                    .catch(next);
                break;
            case 'restore':
                Course.restore({
                    _id: {
                        $in: req.body.courseIds,
                    },
                })
                    .then(() => {
                        res.redirect('back');
                    })
                    .catch(next);
                break;
            default:
                res.json(req.body);
        }
    }
}
module.exports = new CourseController();
