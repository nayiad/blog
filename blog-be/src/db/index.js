require('./Schemas/User'); 

const mongoose = require('mongoose');

const connect = () => {
    return new Promise((resolve) => {
        //连接数据库
        mongoose.connect('mongodb://127.0.0.1:27017/blog');

        //数据库连接时输出文本
        mongoose.connection.on('open', () => {
            console.log('连接数据库成功');

            resolve();
        })
    });
};

module.exports = {
    connect,
};