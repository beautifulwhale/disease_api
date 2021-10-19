const mysql = require('mysql');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'ill'
})
/**
 * 封装一个数据库模型基类
 */
module.exports = class Model {
    /**
     * 通用的查询方法
     * 要执行的sql语句
     */
    static query(sql, params) {
        return new Promise((reslove, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    console.error(err);
                    connection.release();
                } else {
                    //query执行sql语句
                    connection.query(sql, params, (err, result) => {
                        if (err) {
                            console.error(err);
                            reject(err)
                        } else {
                            reslove(result)
                        }
                        //结束会话，释放连接
                        connection.release()
                    })
                }

            })
        })

    }
    static formParams() {
        let array = [];
        for (let i = 0; i < arguments.length; i++) {
            array.push(arguments[i])
        }
        return array 
    }
}