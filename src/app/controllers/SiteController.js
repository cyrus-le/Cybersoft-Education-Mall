const Course = require('../models/Course');
const {
    mongooseToObject,
    multipleMongooseToObject,
} = require('../../utils/mongoose');
class SiteController {
    //GET /
    index(req, resp, next) {
        /**
         * Viết theo kiểu promises
         */
        Course.find({})
            .then((courses) => {
                resp.render('home', {
                    courses: multipleMongooseToObject(courses),
                });
                // resp.json(courses)
            })
            .catch(next);

        /**
         * Viết theo kiểu callback
         Course.find({}, function (error, courses) {
               if (!error) {
                   resp.json(courses);
                   console.log(resp.json(courses));
               } else {
                 next(error);
               }
           }); 
         */

        // resp.json({
        //     name: 'test'
        // });

        // resp.render('home');
    }

    //[GET] /news/:slug
    search(req, resp) {
        resp.render('search');
    }
}
module.exports = new SiteController();
