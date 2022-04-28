const mongoose = require('mongoose');
//连接数据库（连接的地址 数据库的名字）
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('database is connected successfully'))
    .catch(err => console.log(err, 'database is not connected'))