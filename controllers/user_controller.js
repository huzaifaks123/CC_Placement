// import model from there modules
const User = require('../models/user_model')

// export profile module
module.exports.profile = function (req, res) {
    if (req.isAuthenticated()) {
        return res.render('profile',{
            user : req.user
        })
    }
    return res.redirect('/user/sign-in')
}

// export signIn module
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    return res.render('signin_form')
}

// export signUp module
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return redirect('/')
    }
    return res.render('signup_form')
}

// export signOut module
module.exports.signOut = function (req, res) {
    req.logout(() => {
        return res.redirect('/user/sign-in')
    })
}

// export externalJobsList module
module.exports.externalJobsList = function (req, res) {
    return res.render('external_jobs_list')
}

// export createUser module
module.exports.createUser = async function (req, res) {
    if (req.body.password !== req.body.confirm_password) {
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

// export createSessions module
module.exports.createSessions = (req, res) => {
    res.redirect('/user/profile')
}