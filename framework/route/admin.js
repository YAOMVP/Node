const express = require('express')

const admin = express.Router()

admin.get('/index', (req, res) => {
    res.send('欢迎来到管理页面')
})
module.exports = admin