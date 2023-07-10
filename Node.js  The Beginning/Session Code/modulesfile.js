var add = (a,b) => {return a+b;}

let mul = (a,b) => {return a*b}

module.exports.sub = (a,b) => {return a-b}  // we need to user module.exports before a function for it to be user in other file

exports.div = (a,b) => {return a/b} // module is optional , exports before a function for it to be user in other file
