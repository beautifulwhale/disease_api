module.exports = class students_mod extends require('./model') {
    /**
     *我的通知分页获取数据与数量
     *
     * @static
     * @param {*} token
     * @param {*} pageNum
     * @param {*} currPage
     */
    static getNoticeMod(token, pageNum, currPage) {
        pageNum = Number(pageNum)
        currPage = Number(currPage)
        currPage = Number(pageNum * currPage);
        return new Promise((resolve, reject) => {
            let sql = "  SELECT  * FROM notice WHERE class like '%" + token + "%' order by createtime desc LIMIT ?,?"
            this.query(sql, this.formParams(currPage, pageNum)).then(res => { resolve(res) }).catch(error => { reject(error) })
        })
    }

    static getNoticeTotal(token) {
        return new Promise((resolve, reject) => {
            let sql = " select count(1) as count from notice WHERE class like '%" + token + "%'"
            this.query(sql).then(res => { resolve(res) }).catch(error => { reject(error) })
        })
    }

    /**
     *获取的我通知已读列表(供已读未读状态渲染)
     *
     * @static
     * @param {*} id
     * @return {*} 
     */
    static getNoticeReadMod(id) {
        return new Promise((resolve, reject) => {
            let sql = "select * from `read` where u_id =?"
            this.query(sql, this.formParams(id)).then(res => { resolve(res) }).catch(error => { reject(error) })
        })
    }

    /**
     *已读转为未读
     *
     * @static
     * @param {*} n_id
     * @param {*} u_id
     */
    static goweiduMod(n_id, u_id) {
        n_id = Number(n_id)
        u_id = Number(u_id)
        return new Promise((resolve, reject) => {
            let sql = "delete from `read` where u_id = ? and n_id = ? "
            this.query(sql, this.formParams(u_id, n_id)).then(res => { resolve(`${u_id}已经转为未读`) }).catch(error => { reject('转换失败') })
        })
    }

    /**
     *未读转为已读
     *
     * @static
     * @param {*} n_id
     * @param {*} u_id
     */
    static goyiduMod(n_id, u_id) {
        n_id = Number(n_id)
        u_id = Number(u_id)
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO   `read` (u_id, n_id) VALUES ('" + u_id + "','" + n_id + "')"
            console.log(sql);
            this.query(sql).then(res => { resolve(`${u_id}的${n_id}已经转为已读`) }).catch(error => { reject('转换失败') })
        })
    }
}
