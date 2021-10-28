// 引入mysql
const mysql = require('mysql');

// 创建连接
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'MScProject'
});

// 暴露出去
module.exports = connection;