const tools = require('../utils/tools')
module.exports = class users_mod extends require('./model') {
    /**
     * 数据库登录
     */
    static LoginUser(username, password, type) {
        type = Number(type);
        return new Promise((resolve, reject) => {
            let sql = "select * from user where binary username= '" + username + "' and password ='" + password + "' and type =  " + type
            // console.log(sql);
            this.query(sql).then(
                result => { resolve(result) }
            ).catch(
                error => { reject('登录失败' + error) }
            )
        })
    }


    // 根据id查询用户信息
    static searchUser(id) {
        return new Promise((resolve, reject) => {
            let sql = "select * from user where binary id= " + id
            this.query(sql).then(res => { resolve(res) }).catch(err => { reject(err + '查询失败了~~') })
        })
    }

    //根据用户类型进行用户信息获取(分页获取总数量与数据)
    static getUsersByType(type, pageNum, currPage) {
        pageNum = Number(pageNum)
        currPage = Number(currPage)
        currPage = Number(pageNum * currPage);
        return new Promise((resolve, reject) => {
            let sql = 'select * from user where type = ' + type + ' order by modifytime desc LIMIT ?,?'
            this.query(sql, this.formParams(currPage, pageNum))
                .then(res => { resolve(res) }).catch(error => { reject(error) })
        })
    }

    static getUserByTypeTotal(type) {
        type = Number(type);
        return new Promise((resolve, reject) => {
            let sql = "select count(1) as count from user where type=" + type
            this.query(sql).then(res => { resolve(res) }).catch(err => { reject(err) })
        })
    }

    /**
     *用户删除)(同时清空该用户阅读记录)
     *
     * @static
     * @param {*} id
     */
    static delUserdataMod(id) {
        return new Promise((resolve, reject) => {
            let sql = "delete from user where id=" + id
            this.query(sql).then(res => { resolve("删除用户成功！") }).catch(err => { reject("删除用户失败！") })
        })
    }

    static delUserdataRead(id) {
        return new Promise((resolve, reject) => {
            let sql = "delete from `read` where u_id=" + id
            this.query(sql).then(res => { resolve("---删除用户阅读记录成功！") }).catch(err => { reject("---删除用户阅读记录失败！") })
        })
    }

    /**
     * 管理员进行用户信息修改
     * @param {*} id 
     * @param {*} username 
     * @param {*} sex 
     * @param {*} address 
     * @param {*} type 
     */
    static upUserdataMod(id, username, sex, address, type) {
        return new Promise((resolve, reject) => {
            let currentTime = tools.getDate19()
            let sql = 'UPDATE `user` SET username="' + username + '",  sex ="' + sex + '" , address= "' + address + '" , type="' + type + '",modifytime="' + currentTime + '" WHERE id = ' + id
            this.query(sql).then(res => { resolve("更新成功") }).catch(err => { reject("更新失败") })
        })
    }

    /**
     *更新用户密码
     *
     * @static
     * @param {*} id
     * @param {*} oldpassword
     * @param {*} newpassword
     */
    static upPwdMod(id, oldpassword, newpassword) {
        id = Number(id);
        return new Promise((resolve, reject) => {
            let sql = "update `user` set password = ? where password = ? and id = ?"
            this.query(sql, this.formParams(newpassword, oldpassword, id)).then(res => { resolve(res) }).catch(err => { reject(err) })
        })
    }
}