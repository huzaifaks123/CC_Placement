module.exports.home = function(req, res){
    // res.end("<h1>Hello Buddy!!</h1>")
    return res.render('_home',{
        user : req.user
    })
}