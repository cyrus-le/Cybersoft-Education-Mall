class NewsController {
    //GET /news
    index(req, resp) {
        resp.render('news');
    }
    //[GET] /news/:slug
    show(req, resp) {
        resp.send('Show details nè ' + req.params.slug);
    }
}
module.exports = new NewsController();
