const User = require('../models/user_model')

module.exports.profile = function (req, res) {
    if (req.isAuthenticated()) {
        return res.render('profile',{
            user : req.user
        })
    }
    return res.redirect('/user/sign-in')
}
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile')
    }
    return res.render('signin_form')
}
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return redirect('/user/profile')
    }
    return res.render('signup_form')
}
module.exports.signOut = function (req, res) {
    req.logout(() => {
        return res.redirect('/user/sign-in')
    })
}

module.exports.externalJobsList = function (req, res) {
    return res.render('external_jobs_list')
}
module.exports.createUser = async function (req, res) {
    console.log("bbbbbbbbb", req.body)
    if (req.body.password !== req.body.confirm_password) {
        console.log("password", req.body.password, req.body.confirm_password)
        return res.redirect('back')
    }
    await User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                User.create(req.body);
                console.log("New User Created")
                return res.redirect('/user/profile')
            } else {
                console.log("User already Exist");
                return res.redirect('/user/sign-in')
            }
        })
        .catch(err => {
            console.log("Error while finding user inside model : ", err)
            return
        })

}
module.exports.createSessions = (req, res) => {
    res.redirect('/user/profile')
}