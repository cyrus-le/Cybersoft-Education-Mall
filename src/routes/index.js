const newsRouter = require('./news');
const siteRouter = require('./site');
function route(app) {
    app.use('/news', newsRouter);
    // app.get('/search', (req,res) => {
    //     res.render('search');
    // });
    // app.post('/search',(req,res) => {
    //     console.log(req.body);
    // });
    app.use('/', siteRouter);
}

module.exports = route;
