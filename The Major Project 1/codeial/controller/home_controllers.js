module.exports.home = async (req, res) => {
    let homeVariables = {
        title: 'Codeial'
    }
    return res.render("home", homeVariables);
}