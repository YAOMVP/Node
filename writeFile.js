const fs = require('fs');

fs.writeFile('./demo.txt', 'Coming soon!', err => {
    if (err != null) {
        console.log(err);
        return; //阻止代码向下执行
    }
    console.log('Success');
})