const route = require('express').Router()

route.get('/', function (req, res) {
    res.send('success')
})

module.exports = route