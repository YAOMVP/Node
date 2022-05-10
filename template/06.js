const template = require('art-template')
const path = require('path')
const dateFormat = require('dateformat')

const views = path.join(__dirname, 'views', '06.art')

template.defaults.imports.dateFormat = dateFormat
const html = template(views, {
    time: new Date()
})
console.log(html);