const query = require('express/lib/middleware/query');
const { token } = require('morgan');
const path = require('path')
const jwtUtil = require('../utils/jwtUtils')
module.exports = class users_dao extends require('../model/users_mod') {
    static async Login(req, res) {
        let body = req.query;
        let loginData = await this.LoginUser(body.username, body.password, body.type);
        if (loginData.lenth != 0) {
            let token = jwtUtil.sign({
                id: loginData[0].id,
                username: loginData[0].username,
                head: loginData[0].head,
                type: loginData[0].type,
                classes: loginData[0].classes
            }, global.globalKey, 3600)

            res.send({ loginData, token });
        } else {
            res.status(500).send('用户名或账号密码输入错误')
        }
    }
    static async getUserDataById(req, res) {
        let u_id = Number(req.query.u_id);
        let result = await this.searchUser(u_id);
        res.send(result);
    }
    static async getUsersByTypePage(req, res) {
        let query = req.query;
        let data = await this.getUsersByType(query.type, query.pageNum, query.currPage);
        let total = await this.getUserByTypeTotal(query.type)
        res.send({ data, total: total[0] })
    }

    /**
    * 用户删除)(同时清空该用户阅读记录)
    */

    static async delUserdata(req, res) {
        let query = req.query;
        let result = await this.delUserdataMod(query.u_id);
        let result1 = await this.delUserdataRead(query.u_id);
        result = result + result1
        res.send(result)
    }

    /**
     * 用户修改
     * @param {*} req 
     * @param {*} res 
     */
    static async upUserdata(req, res) {
        let query = req.query;
        console.log(query);
        let data = await this.upUserdataMod(query.u_id, query.username, query.sex, query.address, query.type)
        res.send(data)
    }
}