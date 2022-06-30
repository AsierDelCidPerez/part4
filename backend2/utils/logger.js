const info = (...params) => console.log(params)
const error = (...params) => console.log(params)


const exported = {info, error}

module.exports = exported