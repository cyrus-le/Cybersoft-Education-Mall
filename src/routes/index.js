const newsRouter = require('./news');
const siteRouter = require('./site');
const courseRouter = require('./course');
const myRouter = require('./my');
function route(app) {
    app.use('/news', newsRouter);
    app.use('/my', myRouter);
    // app.get('/search', (req,res) => {
    //     res.render('search');
    // });
    // app.post('/search',(req,res) => {
    //     console.log(req.body);
    // });
    app.use('/courses', courseRouter);
    app.use('/', siteRouter);
}

module.exports = route;
