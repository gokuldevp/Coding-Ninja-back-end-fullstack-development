module.exports.profile = async (req, res)=> {
    let profileVariable = {
        title: 'Gokul'
    }
    return res.render('profile', profileVariable)
}