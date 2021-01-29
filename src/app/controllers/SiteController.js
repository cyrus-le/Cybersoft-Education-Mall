class SiteController{
    
    //GET /
    index(req, resp){
        resp.render('home');
    }
    //[GET] /news/:slug
    search(req, resp){
        resp.render('search');
    }
}
module.exports = new SiteController;