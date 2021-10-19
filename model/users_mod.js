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

}