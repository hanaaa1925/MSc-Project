const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const connection = require('./conn');     // 引入连接数据库模块

connection.connect(() => {
    console.log("Database connection succeeded")
});

let server = '192.168.43.102';
let port = 8088;

// 登录请求api
router.post('/login', (req, res) => {
    // 接收帐号和密码
    let {username, password} = req.body;
    // 在数据库查询是否存在此帐号和密码的用户
    // 查询数据
    const sqlStr = `select username from user where username='${username}' and password='${password}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 验证该邮箱是否已注册api
router.post('/getUserEmail', (req, res) => {
    let email = req.body.email;
    const sqlStr = `select email from user where email='${email}'`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 添加注册用户记录api
router.post('/register', (req, res) => {
    let {realname, username, password, email, company, department} = req.body;
    const sqlStr = `insert into user (realname, username, password, email, company, department) 
    values('${realname}','${username}','${password}','${email}','${company}','${department}')`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

// 添加注册用户记录api
router.post('/postContent', (req, res) => {
    let {username, content, time} = req.body;
    const sqlStr = `insert into content (username, content, time) 
    values(''${username}','${content}','${time}')`;
    connection.query(sqlStr, (err, data) => {
        if (err) {
            throw err;
        } else {
            res.send(data);
        }
    });
});

module.exports = router;
