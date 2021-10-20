
module.exports = class admin_mod extends require('./model') {
    /**
     *根据用户类型与查询字段模糊查询 (数据与总数量返回)
     *
     * @static
     * @param {*} type
     * @param {*} inputText
     * @param {*} CharType
     * @param {*} pageNum
     * @param {*} currPage
     * @return {*} 
     */
    static getUsersByTypeAndCharMod(type, inputText, CharType, pageNum, currPage) {
        currPage = Number(currPage)
        pageNum = Number(pageNum);
        currPage = Number(currPage * pageNum)
        return new Promise((resolve, reject) => {
            let sql = 'select * from user where ' + CharType + ' like"%' + inputText + '%"and type=' + type + ' LIMIT ?,?'
            this.query(sql, this.formParams(currPage, pageNum)).then(
                res => { resolve(res) }
            ).catch(err => { reject(err) })
        })
    }

    static getUsersByTypeAndCharTotal(type, inputText, CharType) {
        type = Number(type);
        return new Promise((resolve, reject) => {
            let sql = 'select count(1) as count from user where ' + CharType + ' like "%' + inputText + '%" and type=' + type
            console.log(sql)
            this.query(sql).then(res => { resolve(res) }).catch(err => { reject(err) })
        })
    }

    /**
     *发布通知
     *
     * @static
     * @param {*} title
     * @param {*} classes
     */
    static announceMod(title, classes) {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO   `notice` (title, class) VALUES ('" + title + "','" + classes + "')"
            this.query(sql).then(res => { resolve("发布成功") }).catch(err => { reject("发布失败") })
        })

    }

    /**
     *获取所有通知与数量(分页获取)
     *
     * @static
     * @param {*} pageNum
     * @param {*} currentPage
     */
    static getAllNoticeMod(pageNum, currentPage) {
        pageNum = Number(pageNum)
        currentPage = Number(currentPage)
        currentPage = Number(currentPage * pageNum);
        return new Promise((resolve, reject) => {
            let sql = "  SELECT  * FROM notice  order by createtime desc  LIMIT ?,?"
            this.query(sql, this.formParams(currentPage, pageNum)).then(res => { resolve(res) }).catch(err => { reject(err) })
        })
    }

    static getAllNoticeTotal() {
        return new Promise((resolve, reject) => {
            let sql = " select count(1) as count from notice "
            this.query(sql).then(res => { resolve(res) }).catch(err => { reject(err) })
        })
    }
}