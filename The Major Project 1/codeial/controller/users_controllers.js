
// Render the profile page
module.exports.profile = async (req, res)=> {
    let profileVariable = {
        title: 'Gokul'
    }
    return res.render('profile', profileVariable)
}

// Render the Signin page
module.exports.signIn = async (req, res) => {
    let signinVariables = {
        title: 'Codeial | SIGN IN'
    }
    return res.render("user_signin", signinVariables);
}

// Render the Signup page
module.exports.signUp = async (req, res) => {
    let signupVariables = {
        title: 'Codeial | SIGN UP'
    }
    return res.render("user_signup", signupVariables);
}

// Handing User Signup
module.exports.create = async (req, res) => {
    //To Do Later
}

// Handing User Signin
module.exports.createSession = async (req, res) => {
    //To Do Later
}